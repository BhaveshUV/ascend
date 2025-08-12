const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const listingRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/review.js");

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

//------------ Enable middlewares for all incoming requests ------------//
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("This is the root GET API and it's working :)");
});

app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewRouter);

app.listen(8080, () => {
    console.log("App server is now listening on port 8080...");
});