const mongoose = require("mongoose");

let listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2020/09/24/16/50/board-5599231_1280.png",
        set: (v) => v === "" ? "https://cdn.pixabay.com/photo/2020/09/24/16/50/board-5599231_1280.png" : v
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    by: {
        type: String,
        required: true
    }
});

listingSchema.pre("findOneAndDelete", async function (next) {
    console.log(`Pre Listing.findOneAndDelete() middleware called.`);
});

listingSchema.post("findOneAndDelete", async (deletedListing, next) => {
    if (deletedListing) {
        console.log(`Post Listing.findOneAndDelete() middleware called, and the listing is deleted`);
    }
    next();
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;