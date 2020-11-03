const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    titleDescript: {
      type: String,
      maxlength: 30,
      required: [true, "Title description is required"],
    },
    descript: {
      type: String,
    
      required: [true, "Description is required"],
    },
    link: String,
    time:{
      type: Date,
      default: Date.now()
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// newsSchema.index({ whoReported: 1, whichDeal: 1 }, { unique: true });

// subscriberSchema.virtual("subscribedDeals", {
//   ref: "Deal",
//   foreignField: "user",
//   localField: "subscribedUser",
// });

// subscriberSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "user",
//     // select: 'name'
//   }).populate({
//     path: "subscribedUser",
//     // select: 'name'
//   });

//   next();
// });

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
