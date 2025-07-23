const mongoose = require("mongoose");

let listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2020/09/24/16/50/board-5599231_1280.png",
        set: (v) => v === "" ? "https://cdn.pixabay.com/photo/2020/09/24/16/50/board-5599231_1280.png" : v
    },
    price: {
        type: Number,
        required: true
    },
    location: String,
    country: String,
    by: {
        type: String,
        required: true
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;