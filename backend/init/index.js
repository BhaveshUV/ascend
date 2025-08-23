const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const sampleListings = require("./data");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ascendApp');
}

main()
    .then(() => console.log("Connected to MongoDB server using Mongoose"))
    .catch(err => console.log(err));

// Initializing the database with users & their listings
const initDB = async () => {
    try {
        let res = await Listing.deleteMany({})
        console.log("Deleted already existing data from DB", res);

        for (let listing of sampleListings) {
            const newUser = {
                username: listing.by,
                email: listing.by.toLowerCase().replace(/\s/g, "") + "@gmail.com",
            };

            try {
                const registeredUser = await User.register(newUser, "Password@12345");
                await Listing.create({ ...listing, by: registeredUser._id });
            } catch (e) {
                console.error("Error registering the user or creating their listing", e);
            }
        }
        console.log("Registered all users and created their listings");
    } catch (e) {
        console.log("Error in initDB: ", e);
    } finally {
        await mongoose.connection.close();
        console.log("Closed the DB connection");
    }
}

initDB();