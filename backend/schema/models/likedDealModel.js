const mongoose = require('mongoose');

const likedDealSchema = new mongoose.Schema({
   deal: {
      type: mongoose.Schema.ObjectId, ref: 'Tour',
      required: [true, 'Review Not Possible Without A Deal']
   },
   user: {
      type: mongoose.Schema.ObjectId, ref: 'User',
      required: [true, 'Review Not Possible Without A User']
   }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

const likedDeal = mongoose.model('likedDeal', likedDealSchema);
module.exports = likedDeal;