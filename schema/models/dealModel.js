const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    titleImg: {
        type: String,
        default: 'corona.jpg'
    },

    affiliateLink: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 1069
    },
    time: {
        type: Date,
        default: Date.now()
    },
    titleDis: {
        type: String,
        maxlength: [30, 'exceeding the word creteria'],
        default: 'Limited offer'
    },
    biggerDis: {
        type: String,
        maxlength: 400
    },
    mrp: {
        type: Number,
        required: true
    },
    dealPrice: {
        type: Number,
        required: true
    },
    dealName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    reportCount: {
        type: Number
    },
    saveLater: Number,
    owner: {
        type: String,
        default: 'Couper Deals'
    },
    buyNow: {
        type: Number
    },
    corouselImgs: Array,
    discount: Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
//virtual populate
dealSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'deal',
    localField: '_id'
});
dealSchema.virtual('likedDeals', {
    ref: 'LikedDeals',
    foreignField: 'deal',
    localField: '_id'
});

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;