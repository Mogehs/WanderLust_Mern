const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You are not logged in");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports.isRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the Owner");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let reviews = await Review.findById(reviewId);
  if (!reviews.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the Author");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, `${error.message} In Listings`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, `${error.message} In Reviews`);
  }
  next();
};
