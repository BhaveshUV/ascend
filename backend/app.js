const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const cors = require("cors");
const methodOverride = require("method-override");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ascendApp');
}

main()
    .then(() => console.log("Connected to MongoDB server using Mongoose"))
    .catch(err => console.log(err));

//---------------- Set up Express server and API routes ----------------//
const app = express();

//---------------- Enable CORS for all incoming requests ----------------//
app.use(cors({
    origin: "http://localhost:1234" // Parcel development phase
}));

//--- Enable server to use method-override for all incoming requests ---//
app.use(methodOverride("_method"));

//------------ Enable middlewares for all incoming requests ------------//
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("This is the root GET API and it's working :)");
});

app.get("/api/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings);
    } catch (e) {
        console.error(`Error fetching all the listings: ${e.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const listing = await Listing.findById(id);
        if (!listing) {
            res.status(404).json({ error: "Listing not found!" });
        }
        res.json(listing);
    } catch (e) {
        console.error(`Error fetching the listing: ${e.message}`);
        res.status(500).json({ error: "An error occurred while fetching the listing. Please try again later." });
    }
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

app.patch("/api/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await Listing.findOneAndUpdate({ _id: id }, req.body, { returnDocument: "after", runValidators: true });
        if (!result) {
            res.status(404).json({ error: "Listing not found!" });
        }
        res.status(200).send();
    } catch (e) {
        console.error(`Error updating the listing: ${e}`);
        res.status(500).json({ error: `Error updating the listing: ${e}`});
    }
});

app.post("/api/listings", async (req, res) => {
    try {
        console.log("Recieved request.body: ", req.body);
        const createdListing = await Listing.create(req.body);
        console.log(createdListing);
        if (!createdListing) return res.status(400).json({ error: "Invalid listing data. Could not create listing." });
        res.status(201).json(createdListing);
    } catch (e) {
        console.error(`Error adding the listing: ${e}`);
        res.status(500).json({ error: `Error adding the listing: ${e}`});
    }
});

app.delete("/api/listings/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let deletedListing = await Listing.findOneAndDelete({ _id: id });
        if (!deletedListing) return res.status(404).json({ error: "Listing not found" });
        res.status(200).send();
    } catch (e) {
        console.error(`Error deleting the listing: ${e}`);
        res.status(500).json({ error: "An error occurred while deleting the listing. Please try again later." });
    }
});

app.listen(8080, () => {
    console.log("App server is now listening on port 8080...");
});