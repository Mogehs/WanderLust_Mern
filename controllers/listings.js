const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listing/index.ejs", { allListings });
};

module.exports.newAddForm = (req, res) => {
  res.render("./listing/new.ejs");
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New List Created Successfully");
  res.redirect("/listings");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const item = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!item) {
    req.flash("error", "Page You Want Access Doesn't Exist");
    res.redirect("/listings");
  }
  res.render("./listing/show.ejs", { item });
};

module.exports.newEditForm = async (req, res) => {
  let { id } = req.params;
  const item = await Listing.findById(id);
  res.render("./listing/edit.ejs", { item });
};

module.exports.editListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "List Updated Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListings = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "List Deleted Successfully");
  res.redirect(`/listings`);
};

module.exports.categories = async (req, res) => {
  let category = req.query.category;
  let listings = await Listing.find().populate("reviews");
  if (category === "trending") {
    const filteredListings = listings.filter(
      (listing) => listing.reviews.length > 0
    );
    const listing = filteredListings.sort(
      (a, b) => b.reviews.length - a.reviews.length
    );
    res.render("./listing/category.ejs", { listing });
  } else {
    let listing = await Listing.find({ category: category });
    if (listing) {
      res.render("./listing/category.ejs", { listing });
    }
  }
};

module.exports.search = async (req, res) => {
  let search = req.query.query;
  if (search === "") {
    res.redirect("/listings");
  } else {
    let listing = await Listing.find({
      title: { $regex: search, $options: "i" },
    });
    res.render("./listing/search.ejs", { listing, search });
  }
};
