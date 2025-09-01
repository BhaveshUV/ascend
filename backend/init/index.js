const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const sampleListings = require("./data");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Initializing the database with users & their listings
async function initDB() {
    try {
        let res = await Listing.deleteMany({});
        await User.deleteMany({});
        console.log("Deleted already existing data from DB", res);

        let usersCreated = 0;
        let listingsCreated = 0;
        for (let listing of sampleListings) {
            const newUser = {
                username: listing.by,
                email: listing.by.toLowerCase().replace(/\s/g, "") + "@gmail.com",
            };

            try {
                const registeredUser = await User.register(newUser, "Password@12345");
                usersCreated++;
                await Listing.create({ ...listing, by: registeredUser._id });
                listingsCreated++;
            } catch (e) {
                console.error("Error registering the user or creating their listing", e);
            }
        }
        console.log(`Registered ${usersCreated} user/s and created ${listingsCreated} listing/s`);
    } catch (e) {
        console.error("Error in initDB: ", e);
    }
}

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true
            }
        });
        console.log("Connected to MongoDB server using Mongoose");
        await initDB();
    } catch (err) {
        console.error("Error during DB connection", err);
    } finally {
        await mongoose.connection.close();
        console.log("Closed the DB connection");
    }
}

main()
    .catch(err => {
        console.error(err);
        process.exit(1);
    });