const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner } = require("../midlewares.js");
const { validateListing } = require("../midlewares.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

/*Search Box*/
router.get("/search", wrapAsync(listingsController.search));

/*Category*/
router.get("/category", wrapAsync(listingsController.categories));

/*Index*/
router.get("/", wrapAsync(listingsController.index));

/*Creating new Listing */
router.get("/new", isLoggedin, listingsController.newAddForm);
router.post(
  "/",
  upload.single("listing[image]"),
  // validateListing,
  wrapAsync(listingsController.createListing)
);

/*Showing Listing */
router.get("/:id", wrapAsync(listingsController.showListings));

/*Edit Listing */
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingsController.newEditForm)
);
router.put(
  "/:id",
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingsController.editListings)
);

/* Delete Listings */
router.delete(
  "/:id",
  isLoggedin,
  isOwner,
  wrapAsync(listingsController.deleteListings)
);

module.exports = router;
