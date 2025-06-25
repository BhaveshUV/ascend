const express = require("express");
const mongoose = require("mongoose");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ascendApp');
}

main()
    .then(() => console.log("Connected to MongoDB server using Mongoose"))
    .catch(err => console.log(err));

//---------------- Set up Express server and API routes ----------------//
const app = express();

app.get("/", (req, res) => {
    res.send("This is the root GET API and it's working :)");
});

app.listen(8080, () => {
    console.log("App server is now listening on port 8080...");
});