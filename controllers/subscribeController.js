const fs = require("fs");
const Subscriber = require("./../schema/models/subscriberModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllSubscriber = factory.getAll(Subscriber);

exports.setDealUserIds = async (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  if (!req.body.subscribedUser) {
    req.body.subscribedUser = req.params.userId;
  }
  next();
};
// exports.delete = catchAsync(async (req, res, next) => {
//   const xyz = await User.findById(req.logged.id);
//   const subModel = await Subscriber.findOneAndDelete({
//     subscribedUser: req.params.sellerId,
//     user: xyz._id,
//   });

//   const subModel = await Subscriber.findById(req.params.id);

//   if (!subModel) {
//     return next();
//   }
//   if (subModel.user._id == req.user.id) {
//     await Subscriber.findByIdAndDelete(req.params.id);

//     // if (!doc) {
//     //   return next(new appError("No Document With That Id", 404));
//     // }

//     res.status(204).json({ status: "success", data: null });
//   } else {
//     res.status(204).json({ status: "failed", data: "wrong" });
//   }
//   next();
// });

exports.getSubscriber = factory.getOne(Subscriber, { path: "subscribedDeals" });

exports.createSubscriber = factory.createOne(Subscriber);

exports.updateSubscriber = factory.updateOne(Subscriber);

exports.deleteSubscriber = factory.deleteOne(Subscriber);
