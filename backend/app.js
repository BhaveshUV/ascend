const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ascendApp');
}

main()
    .then(() => console.log("Connected to MongoDB server using Mongoose"))
    .catch(err => console.log(err));

//---------------- Set up Express server and API routes ----------------//
const app = express();

app.get("/api", (req, res) => {
    res.send("This is the root GET API and it's working :)");
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

app.listen(8080, () => {
    console.log("App server is now listening on port 8080...");
});