const fs = require('fs');
const Report = require('./../schema/models/reportModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReports = factory.getAll(Report);

exports.setDealUserIds = async (req, res, next) => {
    if (!req.body.deal) { req.body.deal = req.params.dealId; }
    if (!req.body.user) { req.body.user = req.user.id; }
    next();
};


exports.getReport = factory.getOne(Report);

exports.createReport = factory.createOne(Report);

exports.updateReport = factory.updateOne(Report);

exports.deleteReport = factory.deleteOne(Report);

