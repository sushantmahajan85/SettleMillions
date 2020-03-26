const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User',
        required: [true, 'subscription Not Possible Without A User']
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;