const fs = require("fs");
const Test = require("./../schema/models/test");
const User = require("./../schema/models/userModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
// const Test = require("../schema/models/test");

exports.getAllTests = factory.getAll(Test);

// exports.setDealUserIds = async (req, res, next) => {
//    if (!req.body.deal) { req.body.deal = req.params.dealId; }
//    if (!req.body.user) { req.body.user = req.user.id; }

//    next();
// };

exports.signUpApp = factory.createOne(User);

exports.getSignUp = factory.getAll(User);

exports.getTest = factory.getOne(Test);

exports.createTest = factory.createOne(Test);

exports.updateTest = factory.updateOne(Test);

exports.deleteTest = factory.deleteOne(Test);

exports.loginApp = async (req, res, next) => {
   try {
     const { email, password } = req.body;
 
     if (!email || !password) {
       return next(
         new AppError("Please provide correct email and password", 400)
       );
     }
     const user = await User.findOne({ email: email }).select("+password");

     if (
       !user ||
       !(await user.verifyPassword(password, user.password)) ||
       !user.verified
     ) {
       return next(new AppError("No user found", 400));
     }

     res.status(200).json({
       status: "success",
       //token,
     });
   } catch (error) {
     console.log(error);
   }
 };
