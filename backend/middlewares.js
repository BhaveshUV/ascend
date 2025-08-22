const { userSchemaValidation } = require("./schemaValidation.js");
const { listingSchemaValidation } = require("./schemaValidation.js");
const { reviewSchemaValidation } = require("./schemaValidation.js");

const validateUser = (req, res, next) => {
    let validity = userSchemaValidation.validate({ user: req.body });
    console.dir(validity);
    if (validity.error) {
        let errMsg = validity.error.details.map((el) => el.message).join(", ");
        return res.status(400).json({ error: errMsg });
    }
    next();
};

const validateListing = (req, res, next) => {
    let validity = listingSchemaValidation.validate({ listing: req.body });
    console.dir(validity);
    if (validity.error) {
        let errMsg = validity.error.details.map((el) => el.message).join(", ");
        return res.status(404).json({ error: errMsg });
    }
    next();
};

const validateReview = (req, res, next) => {
    let validity = reviewSchemaValidation.validate({ review: req.body });
    console.dir(validity);
    if (validity.error) {
        let errMsg = validity.error.details.map((el) => el.message).join(", ");
        return res.status(404).json({ error: errMsg });
    }
    next();
};

const isUserLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(400).json({ error: "You are not logged in" });
    next();
}

module.exports = {
    validateUser,
    validateListing,
    validateReview,
    isUserLoggedIn
}