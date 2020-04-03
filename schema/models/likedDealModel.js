const mongoose = require('mongoose');

const likedDealSchema = new mongoose.Schema({
   deal: {
      type: mongoose.Schema.ObjectId, ref: 'Deal',
      required: [true, 'like Not Possible Without A Deal']
   },
   seller: {
      type: mongoose.Schema.ObjectId, ref: 'User',
      required: [true, 'like Not Possible Without A User']
   }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

likedDealSchema.pre(/^find/, function (next) {
   this.populate({
      path: 'deal',
      // select: 'name'
   }).populate({
      path: 'seller',
      // select: 'name'
   });

   next();
});

const LikedDeal = mongoose.model('LikedDeal', likedDealSchema);
module.exports = LikedDeal;