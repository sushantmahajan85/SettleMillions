const mongoose = require('mongoose');
const Deal = require('./dealModel');

const reviewSchema = new mongoose.Schema({
   review: {
      type: String, required: [true, 'Review is Required'], trim: true,
      minLength: [0, 'Review Too Small']
      //validate: [validator.isAlpha, 'Deal Name Should Not Have Numbers']
   },
   createdAt: { type: Date, default: Date.now() },
   rating: {
      type: Number, min: 1, max: 5
   },
   deal: {
      type: mongoose.Schema.ObjectId, ref: 'Deal',
      required: [true, 'Review Not Possible Without A Deal']
   },
   user: {
      type: mongoose.Schema.ObjectId, ref: 'User',
      required: [true, 'Review Not Possible Without A User']
   }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

reviewSchema.index({ deal: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
   this.populate({
      path: 'user',
      select: 'name'
   });

   next();
});

// reviewSchema.statics.calcAverageRatings = async function (dealId) {
//    const stats = await this.aggregate([
//       {
//          $match: { deal: dealId }
//       },
//       {
//          $group: {
//             _id: '$tour',
//             nRating: { $sum: 1 },
//             avgRating: { $avg: '$rating' }
//          }
//       }
//    ]);

//    if (stats.length > 0) {
//       await Deal.findByIdAndUpdate(dealId, {
//          ratingsQuantity: stats[0].nRating,
//          ratingsAverage: stats[0].avgRating
//       });
//    } else {
//       await Deal.findByIdAndUpdate(dealId, {
//          ratingsQuantity: 0,
//          ratingsAverage: 4.5
//       });
//    }
// };

// reviewSchema.post('save', function () {
//    this.constructor.calcAverageRatings(this.deal);
// });

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//    this.r = await this.findOne();
//    //console.log(this.r);

//    next();
// });

// reviewSchema.post(/^findOneAnd/, async function () {
//    await this.r.constructor.calcAverageRatings(this.r.deal);
// });


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;