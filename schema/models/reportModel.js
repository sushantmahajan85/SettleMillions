const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    whoReported: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Report Not Possible Without A User"],
    },
    whichDeal: {
      type: mongoose.Schema.ObjectId,
      ref: "deal",
      required: [true, "Report Not Possible Without A Deal"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reportSchema.index({ whoReported: 1, whichDeal: 1 }, { unique: true });

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

const Reported = mongoose.model("Report", reportSchema);
module.exports = Reported;
