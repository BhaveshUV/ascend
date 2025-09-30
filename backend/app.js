const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const MongoStore = require("connect-mongo");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Routers
const listingRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/review.js");
const userRouter = require("./routers/user.js");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect(process.env.MONGO_URI, {
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true
        }
    });
}

main()
    .then(() => {
        console.log("Connected to MongoDB server using Mongoose");

        //---------------- Set up Express server and API routes ----------------//
        const app = express();

        //---------------- Enable CORS for all incoming requests ----------------//
        app.use(cors({
            origin: process.env.FRONTEND_URL || "http://localhost:1234", // Parcel development phase
            credentials: true // This includes 'Access-Control-Allow-Credentials' in CORS response which requests the browser to store the cookie
        }));

        //------------ Enable middlewares for all incoming requests ------------//
        app.use(express.json());

        //------------ Enable cookie-parser for all incoming requests ------------//
        app.use(cookieParser(process.env.SESSION_SECRET));

        //----------- Enable express-session for all incoming requests ----------//
        const sessionStore = {
            mongoUrl: process.env.MONGO_URI,
            crypto: {
                secret: process.env.SESSION_SECRET
            },
            touchAfter: 24 * 3600 // this makes connect-mongo to update session document in db only once every 24 hr unless session data changes
        }

        const sessionOptions = {
            store: MongoStore.create(sessionStore),
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false, // true would create empty sessions for every new visitor, even before log in —> confusion
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            }
        };

        if (process.env.NODE_ENV === "production") {
            // this tell express — it's behind a proxy (Render/Netlify/Heroku etc.)
            app.set("trust proxy", 1);
        }

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

        const PORT = process.env.PORT || 8080; // 'Render' platform automatically injects PORT when it runs the app
        app.listen(PORT, () => {
            console.log("App server is now listening on port 8080...");
        });

    }).catch(err => {
        console.log(err);
        process.exit(1);
    });