const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User',
        required: [true, 'subscription Not Possible Without A User']
    },
    subscriber: {
        type: mongoose.Schema.ObjectId, ref: 'User',
        required: [true, 'subscription Not Possible Without A User']
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

subscriberSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        // select: 'name'
    }).populate({
        path: 'subscriber',
        // select: 'name'
    });

    next();
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;