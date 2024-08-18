const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");
const Schema = mongoose.Schema;

let listSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: { type: Number },
  location: { type: String },
  country: { type: String },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      "mountains",
      "cities",
      "arctic",
      "rooms",
      "cities",
      "castles",
      "pools",
      "campings",
      "farms",
    ],
  },
});

listSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = new mongoose.model("Listing", listSchema);
module.exports = Listing;
