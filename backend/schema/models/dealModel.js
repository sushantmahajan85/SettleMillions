const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    titleImg: {
        type: String,
        // default
    },

    affiliateLink: {
        type: URL,
        required: true
    },
    views: String,
    time: {
        type: String,
        default: Date.now()
    },
    titleDis: {
        type: String,
        maxlength: [30, 'exceeding the word creteria']
    },
    biggerDis: {
        type: String,
        maxlength: 400
    },
    mrp: {
        type: String,
        required: true
    },
    dealPrice: {
        type: String,
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
        // default
    },
    buyNow: {
        type: Number
    },
    trending: {
        type: Boolean,
        default: false
    },
    corouselImgs: Array,
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;