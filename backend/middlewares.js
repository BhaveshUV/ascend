const { userSchemaValidation } = require("./schemaValidation.js");
const { listingSchemaValidation } = require("./schemaValidation.js");
const { reviewSchemaValidation } = require("./schemaValidation.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

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
    if (!req.body.by) req.body.by = req.user._id;
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
};

const isUserListingOwner = async (req, res, next) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        console.dir(listing);
        console.log("listing id received: " + id);
        if (!listing.by.equals(req.user._id)) return res.status(400).json({ error: "You do not have permission for this listing" });
        next();
    } catch (e) {
        res.status(500).json({ error: "Some error occurred on the server" });
    }
};

const isUserReviewOwner = async (req, res, next) => {
    let { reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.by.equals(req.user._id)) return res.status(400).json({ error: "You do not have permission to delete this review" });
    next();
};

module.exports = {
    validateUser,
    validateListing,
    validateReview,
    isUserLoggedIn,
    isUserListingOwner,
    isUserReviewOwner
}