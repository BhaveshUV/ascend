const mongoose = require("mongoose");
const Listing = require("../models/listing");
const sampleListings = require("./data");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ascendApp');
}

main()
    .then(() => console.log("Connected to MongoDB server using Mongoose"))
    .catch(err => console.log(err));

// Initializing the database with sample listings
const initDB = () => {
    Listing.deleteMany({})
        .then(res => console.log("Deleted already existing data from DB", res))
        .catch(e => console.log("Error while deleting already existing data from the DB: ", e));

    Listing.insertMany(sampleListings)
        .then(res => console.log("Initialized DB with sample listings successfully:\n", res))
        .catch(e => console.log(e));
}

initDB();