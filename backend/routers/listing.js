const express = require("express");
const router = express.Router();
const { validateListing, isUserLoggedIn, isUserListingOwner } = require("../middlewares");
const listingController = require("../controllers/listingController");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router.route("/")
    .get(listingController.getAll)
    .post(isUserLoggedIn, upload.single("imageFile"), validateListing, listingController.post);

router.route("/:id")
    .get(listingController.getById)
    .patch(isUserLoggedIn, upload.single("imageFile"), isUserListingOwner, validateListing, listingController.updateById)
    .delete(isUserLoggedIn, isUserListingOwner, listingController.deleteById);

module.exports = router;