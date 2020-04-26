const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const User = require("./../schema/models/userModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const factory = require("./handlerFactory");

// const userData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/userData.json`));

// const Update = require('./../app');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = factory.getAll(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new appError("Not For Password Updation. Use /updateMyPassword", 400)
    );
  }

  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: "success", data: { user: updatedUser } });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: "success", data: null });
});

exports.getUser = factory.getOne(User, { path: "subscribers likedDeals" });

/////// Never Used Because We Sign Up Users Not Create Them
exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "Route not defined. Use /signup" });
};

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

//////////////////////////////////////////////////////////////////////////////////////////////
/////// Needed Later For Image Uploads

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("Not An Image. Upload An Image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const ext = req.file.mimetype.split("/")[1];
  req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});
