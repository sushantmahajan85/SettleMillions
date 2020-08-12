const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");
const random = require("../../utils/utils");
const sendEmail = require("../../utils/email");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      maxLength: [20, "Name Too Large"],
      minLength: [0, "Name Too Small"],
      //validate: [validator.isAlpha, 'Tour Name Should Not Have Numbers']
    },
    channelName: {
      type: String,
      trim: true,
      default: "Channel",
    },
    photo: { type: String },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    phoneNo: {
      type: Number,
      //maxLength: [10, 'Invalid Phone Number'], minLength: [10, 'Invalid Phone Number']
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [8, "Password Too Small"],
      select: false,
    },
    gSignin: String,
    passwordConfirm: {
      type: String,
      required: [true, "Comfirm Password is Required"],
      minLength: [8, "Password Too Small"],
      select: false,
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: "Passwords Do Not Match",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: { type: Boolean, default: true, select: false },
    verified: {
      type: Boolean,
      // required: true,
      default: false,
    },
    verification_token: {
      type: Number,
      select: false,
    },
    rank: {
      type: Number,
      default: 100000,
    },
    rankLatest: {
      type: Number,
      default: 100000,
    },
    verification_token_time: {
      type: Date,
    },
    rank_difference: Number,
    cookies: Array,
    r1: String,
    r2: String,
    r3: String,
    r4: String,
    r5: String,
    groupCount: Number,
    numberOfGroups: Number,
    reportChannelCount: { type: Number, default: 0 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//userSchema.aggregate({$sort: {'rank': 1}});

userSchema.virtual("likedDeals", {
  ref: "LikedDeal",
  foreignField: "user",
  localField: "_id",
});
userSchema.virtual("subscribers", {
  ref: "Subscriber",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", async function(next) {
  // this.password = await bcrypt.hash(this.password, 12);
  this.verification_token = random();
  this.verification_token_time = Date.now() + 10 * 60 * 1000;
  this.timeStamp = Date.now();

  next();
});
userSchema.post("save", async function() {
  const message = `Here is your 5 digit OTP : ${this.verification_token}`;

  // await sendEmail({
  //     email: this.email,
  //     subject: 'your 5 digit otp valid for 10 mins only',
  //     message
  // });
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.verifyPassword = async function(
  LoginPassword,
  signUpPassword
) {
  return await bcrypt.compare(LoginPassword, signUpPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    //console.log(changedTimestamp, JWTTimestamp);

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// userSchema.methods.emailVerify = function () {
//     this.verification_token = random();
//     this.verification_token_time = Date.now() + 10 * 1000 * 60;
// }

const User = mongoose.model("User", userSchema);
module.exports = User;
