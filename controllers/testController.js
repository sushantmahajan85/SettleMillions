const fs = require("fs");
const Test = require("./../schema/models/test");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
// const Test = require("../schema/models/test");

exports.getAllTests = factory.getAll(Test);

// exports.setDealUserIds = async (req, res, next) => {
//    if (!req.body.deal) { req.body.deal = req.params.dealId; }
//    if (!req.body.user) { req.body.user = req.user.id; }

//    next();
// };

exports.getTest = factory.getOne(Test);

exports.createTest = factory.createOne(Test);

exports.updateTest = factory.updateOne(Test);

exports.deleteTest = factory.deleteOne(Test);
