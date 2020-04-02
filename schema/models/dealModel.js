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
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;