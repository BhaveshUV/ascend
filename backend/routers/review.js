const express = require("express");
const router = express.Router({mergeParams: true});
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { validateReview, isUserLoggedIn } = require("../middlewares");

router.post("/", isUserLoggedIn, validateReview, async (req, res) => {
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

router.delete("/:reviewId", isUserLoggedIn, async (req, res) => {
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

module.exports = router;