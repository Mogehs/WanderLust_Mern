const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isReviewAuthor } = require("../midlewares.js");
const { validateReview } = require("../midlewares.js");
const reviewController = require("../controllers/reviews.js");

/* Showing Reviews */
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.showReview)
);

router.delete(
  "/:reviewId",
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
