const fs = require('fs');
const Subscriber = require('./../schema/models/subscriberModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllSubscriber = factory.getAll(Subscriber);

exports.setDealUserIds = async (req, res, next) => {
    // if (!req.body.deal) { req.body.deal = req.params.dealId; }
    if (!req.body.user) { req.body.user = req.user.id; }
    next();
};

exports.getSubscriber = factory.getOne(Subscriber);

exports.createSubscriber = factory.createOne(Subscriber);

exports.updateSubscriber = factory.updateOne(Subscriber);

exports.deleteSubscriber = factory.deleteOne(Subscriber);

