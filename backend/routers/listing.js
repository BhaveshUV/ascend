const express = require("express");
const router = express.Router();
const { validateListing, isUserLoggedIn, isUserListingOwner } = require("../middlewares");
const listingController = require("../controllers/listingController");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname,"../uploads") });

router.route("/")
    .get(listingController.getAll)
    .post(isUserLoggedIn, upload.single("imageFile"), validateListing, listingController.post);

router.route("/:id")
    .get(listingController.getById)
    .patch(isUserLoggedIn, upload.single("imageFile"), isUserListingOwner, validateListing, listingController.updateById)
    .delete(isUserLoggedIn, isUserListingOwner, listingController.deleteById);

module.exports = router;