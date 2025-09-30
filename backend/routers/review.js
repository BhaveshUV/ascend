const express = require("express");
const router = express.Router({mergeParams: true});
const { validateReview, isUserLoggedIn, isUserReviewOwner } = require("../middlewares");
const reviewController = require("../controllers/reviewController");

router.post("/", isUserLoggedIn, validateReview, reviewController.post);
router.delete("/:reviewId", isUserLoggedIn, isUserReviewOwner, reviewController.deleteById);

module.exports = router;