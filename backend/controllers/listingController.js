const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { cloudinary } = require("../cloudConfig");

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
        if (req.file) {
            req.body.image.filename = req.file.filename;
            req.body.image.url = req.file.path;
        }
        console.log("req.body after updating req.body.image", req.body);
        let result = await Listing.findOneAndUpdate({ _id: id }, req.body, { returnDocument: "before", runValidators: true });
        if (!result) return res.status(404).json({ error: "Listing not found!" });
        if (req.file && result.image.filename) {
            try {
                let delResult = await cloudinary.uploader.destroy(result.image.filename);
                console.log(`Previous cloudinary image deleted successfully for listing: ${result.title}`, delResult);
            } catch (err) {
                console.error(`Error deleting the previous cloudinary image of the listing '${result.title}': `, err);
            }
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
        if (req.file) {
            req.body.image.url = req.file.path;
            req.body.image.filename = req.file.filename;
        }
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
        console.log("This is the deleted listing: ", deletedListing);
        if (deletedListing.image.filename) {
            try {
                let delResult = await cloudinary.uploader.destroy(deletedListing.image.filename);
                console.log(`Previous cloudinary image deleted successfully for listing: ${deletedListing.title}`, delResult);
            } catch (err) {
                console.error(`Error deleting the previous cloudinary image of the listing '${deletedListing.title}': `, err);
            }
        }
        await Review.deleteMany({ _id: { $in: deletedListing.reviews } });
        res.status(200).send();
    } catch (e) {
        console.error(`Error deleting the listing: ${e}`);
        res.status(500).json({ error: "An error occurred while deleting the listing. Please try again later." });
    }
};