const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const Deal = require("./../schema/models/dealModel");

const News = require("./../schema/models/newsModel");

const Page = require("./../schema/models/pageModel");
const catchAsync = require("./../utils/catchAsync");

const factory = require("./handlerFactory");
exports.setDealUserIds = async (req, res, next) => {
  req.body.user = req.user.id;
  // console.log(req.file);
  // req.file.user = req.user.id;

  // if (!req.body.user) { req.body.user = req.user.id; }
  next();
};

exports.getAllDeals = factory.getAll(Deal);
// exports.getDeal = factory.getOne(Deal, { path: "reviews" });
exports.createDeal = factory.createOne(Deal);
exports.createNews = factory.createOne(News);
exports.createPage = factory.createOne(Page);
exports.updateDeal = factory.updateOne(Deal);
exports.deleteDeal = factory.deleteOne(Deal);
exports.getTrending = catchAsync(async (req, res) => {
  const trending = await Deal.find({
    views: { $gt: 1000 },
  });
  res.status(200).json({
    status: "success",
    length: trending.length,
    data: {
      trending,
    },
  });
});

exports.getDeal = catchAsync(async (req, res) => {
  const deal = await Deal.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { views: 1 } }
  ).populate({ path: "reviews" });
  console.log(deal);
  console.log(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      deal,
    },
  });
});

// FOR IMAGE UPLOADS ///// NEEDED FOR LATER

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

exports.uploadDealImages = upload.fields([
  { name: "titleImg", maxCount: 1 },
  { name: "corouselImgs", maxCount: 4 },
]);

//upload.array('images', 4);

exports.resizeDealImages = catchAsync(async (req, res, next) => {
  // console.log(req.files);
  //console.log(req.body.user);
  // console.log(req.user);

  if (!req.files || !req.files.titleImg) {
    return next();
  }

  //   const ext = req.file.mimetype.split("/")[1];

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  req.body.titleImg = `deal-${req.user.id}-${Date.now()}-title.jpeg`;
  // req.body.titleImg = `deal-${Date.now()}-title.jpeg`;

  await sharp(req.files.titleImg[0].buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 10 })
    .toFile(`public/img/deals/${req.body.titleImg}`);
  // .resize(2000, 1333)

  //console.log(req.files.corouselImgs);

  if (!req.files.corouselImgs) {
    return next();
  }

  req.body.corouselImgs = [];
  // req.body.user = req.user.id;
  await Promise.all(
    req.files.corouselImgs.map(async (file, i) => {
      const filename = `deal-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        // .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/deals/${filename}`);

      req.body.corouselImgs.push(filename);
    })
  );

  next();
});

// exports.aliasTopDeals = (req, res, next) => {
//   req.query.limit = "5";
//   req.query.sort = "-ratingAverage,price";
//   req.query.fields = "name,price,summary,ratingAverage";
//   next();
// };

// const deals = JSON.parse(
//   fs.readFileSync("./starter/dev-data/data/deals-simple.json")
// );

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res
//       .status(400)
//       .json({ status: "fail", message: "Missing name or price" });
//   }
//   next();
// };
