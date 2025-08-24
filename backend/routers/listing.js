const express = require("express");
const router = express.Router();
const { validateListing, isUserLoggedIn, isUserListingOwner } = require("../middlewares");
const listingController = require("../controllers/listingController");

router.get("/", listingController.getAll);
router.get("/:id", listingController.getById);
router.patch("/:id", isUserLoggedIn, isUserListingOwner, validateListing, listingController.updateById);
router.post("/", isUserLoggedIn, validateListing, listingController.post);
router.delete("/:id", isUserLoggedIn, isUserListingOwner, listingController.deleteById);

module.exports = router;