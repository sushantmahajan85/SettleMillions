const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "subscription Not Possible Without A User"],
    },
    subscribedUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "subscription Not Possible Without A User"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

subscriberSchema.index({ user: 1, subscribedUser: 1 }, { unique: true });

subscriberSchema.virtual("subscribedDeals", {
  ref: "Deal",
  foreignField: "user",
  localField: "subscribedUser",
});

subscriberSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    // select: 'name'
  }).populate({
    path: "subscribedUser",
    // select: 'name'
  });

  next();
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;
