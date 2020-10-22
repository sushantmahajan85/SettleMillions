const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../schema/models/userModel");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const random = require("../utils/utils");
const crypto = require("crypto");
const catchAsync = require("./../utils/catchAsync");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

exports.signUp = async (req, res) => {
  try {
    const newz = await User.findOne({ gSignin: req.body.gSignin });
    console.log(newz);
    if (newz && req.body.gSignin != null) {
      res.cookie("one", "cleared", {
        expires: new Date(Date.now() + 1),
        // secure: true,
        httpOnly: true,
      });
      res.cookie("two", "cleared", {
        expires: new Date(Date.now() + 1),
        // secure: true,
        httpOnly: true,
      });
      res.cookie("three", "cleared", {
        expires: new Date(Date.now() + 1),
        // secure: true,
        httpOnly: true,
      });
      res.cookie("four", "cleared", {
        expires: new Date(Date.now() + 1),
        // secure: true,
        httpOnly: true,
      });
      res.cookie("five", "cleared", {
        expires: new Date(Date.now() + 1),
        // secure: true,
        httpOnly: true,
      });

      const token = signToken(newz._id);
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
        ),
        // secure: true,
        httpOnly: true,
      };
      if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

      res.cookie("jwt", token, cookieOptions);
      res.status(200).json({
        status: "success",
        token,
        data: {
          newz,
        },
      });
    }else{

      //   /////////////////////////////////Error in Production/////////////////////////////////////////////
      //   try {
      //     const url = "amazon.in";
      //     await new Email(user, url).sendWelcome();
      //     // }catch (err) {
      //     //   console.log(err);
      //     // }
      //     //////////////////////////////////////////////////////////////////////////////////////////////////

      const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        gSignin: req.body.gSignin,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        passwordConfirm: req.body.passwordConfirm,
      });
      const token = signToken(newUser._id);
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
        ),
        // secure: true,
        httpOnly: true,
      };
      if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

      res.cookie("jwt", token, cookieOptions);
      res.status(201).json({
        status: "success",
        token,
        data: {
          newUser,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

// exports.signUpApp = catchAsync(async (req, res) => {
//   //try {
//     const newUser = await User.create({
//       name: req.body.name,
//       password: req.body.password,
//       //gSignin: req.body.gSignin,
//       email: req.body.email,
//       //phoneNo: req.body.phoneNo,
//       passwordConfirm: req.body.passwordConfirm,
//     });

//     res.status(201).json({
//       status: "success",
//       //token,
//       data: {
//         newUser,
//       },
//     });
//   // } catch (error) {
//   //   console.log(error);
//   //   res.status(404).json({
//   //     status: "fail",
//   //     message: error,
//   //   });
//   // }
// });

exports.verify = async (req, res, next) => {
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const { verification_token } = req.body;
    const user = await User.findOneAndUpdate(
      {
        verification_token: verification_token,
        verification_token_time: { $gt: Date.now() },
      },
      { verified: true },
      { new: true, runValidators: true }
    );
    if (!user) {
      return next(new AppError("Wrong OTP", 400));
    }
    // aana chahiye
    const url = "amazon.in";
    await new Email(user, url).sendWelcome();
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
      ),
      // secure: true,
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({
      status: "success",
      token,
      data: {
        verification_token,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(404).json({
      status: "fail",
      data: {
        err,
      },
    });
  }
};

exports.login = async (req, res, next) => {
  res.cookie("one", "cleared", {
    expires: new Date(Date.now() + 1),
    // secure: true,
    httpOnly: true,
  });
  res.cookie("two", "cleared", {
    expires: new Date(Date.now() + 1),
    // secure: true,
    httpOnly: true,
  });
  res.cookie("three", "cleared", {
    expires: new Date(Date.now() + 1),
    // secure: true,
    httpOnly: true,
  });
  res.cookie("four", "cleared", {
    expires: new Date(Date.now() + 1),
    // secure: true,
    httpOnly: true,
  });
  res.cookie("five", "cleared", {
    expires: new Date(Date.now() + 1),
    // secure: true,
    httpOnly: true,
  });

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide correct email and password", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");
  // const test = JSON.stringify(user);
  // const url = "amazon";
  // await new Email(user, url).sendWelcome();
  if (
    !user ||
    !(await user.verifyPassword(
      password,
      user.password
    )) /*||
      !user.verified*/
  ) {
    return next(new AppError("No user found", 400));
  }

  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // const resetURL = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/users/resetPassword/${resetToken}`;

  // await sendEmail({
  //   ////// For Sending Reset Password Mail //////
  //   email: user.email,
  //   subject: "Password Reset Token ( Valid For 10 Minutes )",
  //   message: message,
  // });

  // const resetURL = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/users/resetPassword/${resetToken}`;

  // await new Email(user, resetURL).sendPasswordReset();

  /////////////////////////////////Error in Production/////////////////////////////////////////////
  try {
    const url = "amazon.in";
    await new Email(user, url).sendWelcome();
    // }catch (err) {
    //   console.log(err);
    // }
    //////////////////////////////////////////////////////////////////////////////////////////////////

    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new AppError("Email Not Sent", 500));
  }
};

exports.logout = (req, res) => {
  console.log('fdfdfdfdfdfd');
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    // secure: true,
    httpOnly: true,
  });

  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.redirect("/");
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  //console.log(token);

  if (!token) {
    return next(new AppError("Not Logged In", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("User For This Token Does Not Exist", 401));
  }

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User Recently Changed The Password. Login Again", 401)
    );
  }

  req.user = freshUser;
  // res.locals.user = freshUser;

  next();
});

exports.resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email: email,
      verified: true,
    });
    if (user) {
      return next(new AppError("hahahaa got u", 400));
    }
    await User.findOneAndDelete({ email: email });
    res.status(204).json({
      status: "success",
      data: null,
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      if (!decoded) {
        res.locals.user = undefined;
        return next();
      }

      const freshUser = await User.findById(decoded.id).populate({
        path: "subscribers",
      });

      if (!freshUser) {
        // res.locals.user = null;
        return next();
      }

      if (freshUser.changedPasswordAfter(decoded.iat)) {
        // res.locals.user = null;
        return next();
      }

      res.locals.user = freshUser;
      req.logged = freshUser;
      return next();
    } catch (err) {
      return next();
    }
  } else {
    res.locals.user = undefined;
  }

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Permission Denied", 403));
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("No User Has That Email", 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // const message = `Forgot Your Password. Submit Request To Change To: ${resetURL}`;

  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;

    // await sendEmail({
    //   ////// For Sending Reset Password Mail //////
    //   email: user.email,
    //   subject: "Password Reset Token ( Valid For 10 Minutes )",
    //   message: message,
    // });

    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/users/resetPassword/${resetToken}`;

    // await new Email(user, resetURL).sendPasswordReset();
    // const test = JSON.stringify(user);
    // const vi = test.split(",")[7];
    // const gi =    vi.split(":")[1];
    await new Email(user, resetURL).sendWelcome();
    res.status(200).json({
      status: "success",
      message: "Token Sent",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError(err, 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token Invalid / Expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.verifyPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Current Password Is Incorrect", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
