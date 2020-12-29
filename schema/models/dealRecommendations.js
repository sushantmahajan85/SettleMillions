const mongoose = require('mongoose');

const recommendDealSchema = new mongoose.Schema({
   recommendations: [String],
   prod_id: String
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

const RecommendedDeal = mongoose.model('Recoms', recommendDealSchema);
module.exports = RecommendedDeal;