const mongoose = require('mongoose');

const likedDealSchema = new mongoose.Schema({
   deal: {
      type: mongoose.Schema.ObjectId, ref: 'Deal',
      required: [true, 'like Not Possible Without A Deal']
   },
   user: {
      type: mongoose.Schema.ObjectId, ref: 'User',
      required: [true, 'like Not Possible Without A User']
   },
   fromUser : String,
   toDeal : String
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

likedDealSchema.index({ deal: 1, user: 1 }, { unique: true });

likedDealSchema.pre(/^find/, function (next) {
   this.populate({
      path: 'deal',
      // select: 'name'
   }).populate({
      path: 'user',
      // select: 'name'
   });

   next();
});
likedDealSchema.pre("save",async function(next){
   this.toDeal = this.deal;
   this.fromUser = this.user;
 next();
 })
 
const LikedDeal = mongoose.model('LikedDeal', likedDealSchema);
module.exports = LikedDeal;