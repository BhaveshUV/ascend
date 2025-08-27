const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const path = require("path");
const fs = require("fs");

module.exports.getAll = async (req, res) => {
    try {
        const allListings = await Listing.find({}).populate({ path: "by", select: "username" });
        res.json(allListings);
    } catch (e) {
        console.error(`Error fetching all the listings: ${e.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "by", select: "username" } }).populate({ path: "by", select: "username" });
        if (!listing) {
            return res.status(404).json({ error: "Listing not found!" });
        }
        res.json(listing);
    } catch (e) {
        console.error(`Error fetching the listing: ${e.message}`);
        res.status(500).json({ error: "An error occurred while fetching the listing. Please try again later." });
    }
};

module.exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("---------req.file--------\n", req.file);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        let oldImage = req.body.image;
        if (req.file) req.body.image = req.file.filename;
        console.log("req.body after updating req.body.image", req.body);
        let result = await Listing.findOneAndUpdate({ _id: id }, req.body, { returnDocument: "after", runValidators: true });
        if (!result) return res.status(404).json({ error: "Listing not found!" });
        if (req.file) {
            let imagePath = path.join(__dirname, "../uploads", oldImage);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting listing image", err)
            });
        }
        res.status(200).send();
    } catch (e) {
        console.error(`Error updating the listing: ${e}`);
        res.status(500).json({ error: `Error updating the listing: ${e}` });
    }
};

module.exports.post = async (req, res) => {
    try {
        console.log("Received request.body: ", req.body);
        console.log("---------req.file--------\n", req.file);
        if (req.file) req.body.image = req.file.filename;
        console.log("req.body after updating req.body.image", req.body);
        const createdListing = await Listing.create(req.body);
        if (!createdListing) return res.status(400).json({ error: "Listing creation failed!" });
        res.status(201).send();
    } catch (e) {
        console.error(`Error adding the listing: ${e}`);
        res.status(500).json({ error: `Error adding the listing: ${e}` });
    }
};

module.exports.deleteById = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedListing = await Listing.findOneAndDelete({ _id: id });
        if (!deletedListing) return res.status(404).json({ error: "Listing not found" });
        let imagePath = path.join(__dirname, "../uploads", deletedListing.image);
        fs.unlink(imagePath, (err) => {
            if (err) console.error("Error deleting listing image", err)
        });
        await Review.deleteMany({ _id: { $in: deletedListing.reviews } });
        res.status(200).send();
    } catch (e) {
        console.error(`Error deleting the listing: ${e}`);
        res.status(500).json({ error: "An error occurred while deleting the listing. Please try again later." });
    }
};