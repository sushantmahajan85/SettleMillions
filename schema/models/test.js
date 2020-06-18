const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
      //unique: true
    },
    price: {
      type: Number,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//virtual populate
// dealSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "deal",
//   localField: "_id",
// });
const Test = mongoose.model("Test", testSchema);
module.exports = Test;
