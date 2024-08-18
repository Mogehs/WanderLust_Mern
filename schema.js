const Joi = require("joi");
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required(),
    }),
  }),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
