const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { listingSchema } = require("../schemaValidation.js");

router.get("/", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings);
    } catch (e) {
        console.error(`Error fetching all the listings: ${e.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const listing = await Listing.findById(id).populate("reviews");
        if (!listing) {
            return res.status(404).json({ error: "Listing not found!" });
        }
        res.json(listing);
    } catch (e) {
        console.error(`Error fetching the listing: ${e.message}`);
        res.status(500).json({ error: "An error occurred while fetching the listing. Please try again later." });
    }
});

// router.get("/api/testListing", (req, res) => {
//     let testListing = new Listing({
//         title: "Test-title",
//         description: "Test-description",
//         price: 1500,
//         location: "Ghorpadi, Pune",
//         country: "India"
//     });

//     testListing.save()
//         .then(result => {
//             console.log("Sample listing is added to the database");
//             res.send(`The following sample listing is now added to database: ${result}`);
//         })
//         .catch(e => res.send(e));
// });

const validateListing = (req, res) => {
    let validity = listingSchema.validate({ listing: req.body });
    console.dir(validity);
    if (validity.error) {
        let errMsg = validity.error.details.map((el) => el.message).join(", ");
        return res.status(404).json({ error: errMsg });
    }
};

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        validateListing(req, res);
        let result = await Listing.findOneAndUpdate({ _id: id }, req.body, { returnDocument: "after", runValidators: true });
        if (!result) {
            return res.status(404).json({ error: "Listing not found!" });
        }
        res.status(200).send();
    } catch (e) {
        console.error(`Error updating the listing: ${e}`);
        res.status(500).json({ error: `Error updating the listing: ${e}` });
    }
});

router.post("/", async (req, res) => {
    try {
        validateListing(req, res);
        console.log("Received request.body: ", req.body);
        const createdListing = await Listing.create(req.body);
        if (!createdListing) return res.status(400).json({ error: "Listing creation failed!" });
        res.status(201).send();
    } catch (e) {
        console.error(`Error adding the listing: ${e}`);
        res.status(500).json({ error: `Error adding the listing: ${e}` });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let deletedListing = await Listing.findOneAndDelete({ _id: id });
        if (!deletedListing) return res.status(404).json({ error: "Listing not found" });
        await Review.deleteMany({ _id: { $in: deletedListing.reviews } });
        res.status(200).send();
    } catch (e) {
        console.error(`Error deleting the listing: ${e}`);
        res.status(500).json({ error: "An error occurred while deleting the listing. Please try again later." });
    }
});

module.exports = router;