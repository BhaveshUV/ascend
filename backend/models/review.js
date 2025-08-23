const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;