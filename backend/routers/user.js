const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { userSchemaValidation } = require("../schemaValidation.js");

const validateUser = (req, res) => {
    let validity = userSchemaValidation.validate({ user: req.body });
    console.dir(validity);
    if (validity.error) {
        let errMsg = validity.error.details.map((el) => el.message).join(", ");
        return res.status(404).json({ error: errMsg });
    }
};

router.post("/signup", async (req, res) => {
    try {
        validateUser(req, res);
        const newUser = new User(req.body);
        const registeredUser = await User.register(newUser, req.body.password);
        if (!registeredUser) {
            res.status(400).json({ error: "User Registration Failed" });
            return;
        }
        res.status(201).send();
    } catch (e) {
        console.error(`Error registering the user: ${e}`);
        res.status(500).json({ error: `Error registering the user: ${e}` });
    }
});

module.exports = router;