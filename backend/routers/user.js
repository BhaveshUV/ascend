const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { validateUser } = require("../middlewares.js");

router.get("/me", async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.json({ user: null });
        res.json({ user: { _id: req.user.id, username: req.user.username, email: req.user.email } });
    } catch (e) {
        console.dir(e);
        res.status(500).json({error: `Error connecting the server`, user: null});
    }
});

router.post("/signup", validateUser, async (req, res) => {
    try {
        const newUser = new User(req.body);
        const registeredUser = await User.register(newUser, req.body.password);

        // Auto log in
        req.login(registeredUser, (err) => {
            if (err) return res.status(500).json({ error: "Sign up succeeded but log in failed" });
            res.status(201).json({ message: "Sign up and log in successful", user: { _id: registeredUser._id, username: registeredUser.username, email: registeredUser.email } });
        });
    } catch (e) {
        console.error(`Error registering the user: ${e}`);
        res.status(500).json({ error: `Error registering the user: ${e}` });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => { // This checks credentials
        if (err) return next(err);
        if (!user) {
            console.dir(info);   // Information provided by local strategy on authentication failure
            return res.status(400).json({ error: "Invalid credentials", info });
        }
        req.login(user, (err) => { // This creates the session
            if (err) return next(err);
            console.dir(user);
            res.status(200).json({ message: "Login successful", user: { _id: user._id, username: user.username, email: user.email } });
        });
    })(req, res, next);
});

module.exports = router;