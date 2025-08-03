const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review = require("./models/review");
const cors = require("cors");
const methodOverride = require("method-override");
const { listingSchema } = require("./schemaValidation.js");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ascendApp');
}

main()
    .then(() => console.log("Connected to MongoDB server using Mongoose"))
    .catch(err => console.log(err));

//---------------- Set up Express server and API routes ----------------//
const app = express();

//---------------- Enable CORS for all incoming requests ----------------//
app.use(cors({
    origin: "http://localhost:1234" // Parcel development phase
}));

//--- Enable server to use method-override for all incoming requests ---//
app.use(methodOverride("_method"));

//------------ Enable middlewares for all incoming requests ------------//
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("This is the root GET API and it's working :)");
});

app.get("/api/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings);
    } catch (e) {
        console.error(`Error fetching all the listings: ${e.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/listings/:id", async (req, res) => {
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

app.get("/api/testListing", (req, res) => {
    let testListing = new Listing({
        title: "Test-title",
        description: "Test-description",
        price: 1500,
        location: "Ghorpadi, Pune",
        country: "India"
    });

    testListing.save()
        .then(result => {
            console.log("Sample listing is added to the database");
            res.send(`The following sample listing is now added to database: ${result}`);
        })
        .catch(e => res.send(e));
});

const validateListing = (req, res) => {
    let validity = listingSchema.validate({ listing: req.body });
    console.dir(validity);
    if (validity.error) {
        let errMsg = validity.error.details.map((el) => el.message).join(", ");
        return res.status(404).json({ error: errMsg });
    }
};

app.patch("/api/listings/:id", async (req, res) => {
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

app.post("/api/listings", async (req, res) => {
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

app.post("/api/listings/:id/reviews", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Listing not found!" });
        }
        const review = await Review.create(req.body);
        if (!review) return res.status(400).json({ error: "Review creation failed!" });
        const updatedListing = await Listing.findByIdAndUpdate(id, { $push: { reviews: review._id } }, { returnDocument: "after" });
        if (!updatedListing) return res.status(400).json({ error: "Review created but failed to update listing with the new review" });
        res.status(201).send();
    } catch (e) {
        console.error(`Error adding the review: ${e}`);
        res.status(500).json({ error: `Error adding the review: ${e}` });
    }
})

app.delete("/api/listings/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let deletedListing = await Listing.findOneAndDelete({ _id: id });
        if (!deletedListing) return res.status(404).json({ error: "Listing not found" });
        res.status(200).send();
    } catch (e) {
        console.error(`Error deleting the listing: ${e}`);
        res.status(500).json({ error: "An error occurred while deleting the listing. Please try again later." });
    }
});

app.delete("/api/listings/:id/reviews/:reviewId", async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) return res.status(404).json({ error: "Review not found" });
        const updatedListing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        if (!updatedListing) return res.status(404).json({ error: "Review deleted but not the reference to it from listing: Couldn't find the listing" });
        res.status(200).send();
    } catch (e) {
        console.error(`Error deleting the review or its reference in its listing: ${e}`);
        res.status(500).json({ error: "An error occurred while deleting the review. Please try again later." });
    }
});

app.listen(8080, () => {
    console.log("App server is now listening on port 8080...");
});