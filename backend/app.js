const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
require("dotenv").config();

// Routers
const listingRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/review.js");
const userRouter = require("./routers/user.js");

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
    origin: "http://localhost:1234", // Parcel development phase
    credentials: true // This includes 'Access-Control-Allow-Credentials' in CORS response which requests the browser to store the cookie
}));

//------------ Enable middlewares for all incoming requests ------------//
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//------------ Enable cookie-parser for all incoming requests ------------//
app.use(cookieParser(process.env.SESSION_SECRET));

//----------- Enable express-session for all incoming requests ----------//
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // true would create empty sessions for every new visitor, even before log in —> confusion
    cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS i.e. on production
        sameSite: "lax" // Set to "none" on production
    }
};

app.use(session(sessionOptions));

// Setup passport to the requests in the express middleware
app.use(passport.initialize());
app.use(passport.session());
// Plug in passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/api", (req, res) => {
    res.send("This is the root GET API and it's working :)");
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = Number.isInteger(err.status) ? err.status :
        Number.isInteger(err.statusCode) ? err.statusCode : 500;
    console.log("-------Error handling middleware-------", err);
    res.status(statusCode).json({ error: err });
});

app.listen(8080, () => {
    console.log("App server is now listening on port 8080...");
});