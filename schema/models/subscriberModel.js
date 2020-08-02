const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    rank: Number,
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

// subscriberSchema.pre(/^aggre/, function(next) {
//   this.populate({
//     path: "user",
//     select: 'rank'
//   }).populate({
//     path: "subscribedUser",
//     select: 'rank'
//   });

  

//   next();
// });

subscriberSchema.pre(/^find/, function(next) {
  // this.populate({
  //   // path: "user",
  //   // select: 'name'
  // })
  this.populate({
    path: "subscribedUser",
    // select: 'name'
  });

  next();
});
subscriberSchema.pre(/^update/, function(next) {
  // this.populate({
  //   // path: "user",
  //   // select: 'name'
  // })
  this.populate({
    path: "subscribedUser",
    // select: 'name'
  });

  

  next();
});

subscriberSchema.pre(/^find/, function() {
  this.rank = this.subscribedUser;

  

  // next();
});



const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;
