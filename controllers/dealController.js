const fs = require('fs');
// const multer = require('multer');
// const sharp = require('sharp');
const Deal = require('./../schema/models/dealModel');
const catchAsync = require('./../utils/catchAsync');

const factory = require('./handlerFactory');
exports.setDealUserIds = async (req, res, next) => {
    if (!req.body.user) { req.body.user = req.user.id; }
    // if (!req.body.user) { req.body.user = req.user.id; }
    next();
};

exports.getAllDeals = factory.getAll(Deal);
exports.getDeal = factory.getOne(Deal, { path: 'reviews' });
exports.createDeal = factory.createOne(Deal);
exports.updateDeal = factory.updateOne(Deal);
exports.deleteDeal = factory.deleteOne(Deal);
exports.getTrending = catchAsync(async (req, res) => {
    const trending = await Deal.find({
        views: { $gt: 1000 },
    });
    res.status(200).json({
        status: 'success',
        length: trending.length,
        data: {
            trending
        }
    })
});


// FOR IMAGE UPLOADS ///// NEEDED FOR LATER

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//    if (file.mimetype.startsWith('image')) {
//       cb(null, true);
//    } else {
//       cb(new appError('Not An Image. Upload An Image', 400), false);
//    }
// };

// const upload = multer({
//    storage: multerStorage,
//    fileFilter: multerFilter
// });

// exports.uploadDealImages = upload.fields([
//    { name: 'imageCover', maxCount: 1 },
//    { name: 'images', maxCount: 3 }
// ]);

// //upload.array('images', 4);

// exports.resizeDealImages = catchAsync(async (req, res, next) => {
//    // console.log(req.files);

//    if (!req.files.imageCover || !req.files.images) { return next(); }

//    req.body.imageCover = `deal-${req.params.id}-${Date.now()}-cover.jpeg`;

//    await sharp(req.files.imageCover[0].buffer)
//       .resize(2000, 1333)
//       .toFormat('jpeg')
//       .jpeg({ quality: 90 })
//       .toFile(`starter/public/img/deals/${req.body.imageCover}`);

//    req.body.images = [];

//    await Promise.all(req.files.images.map(async (file, i) => {
//       const filename = `deal-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//       await sharp(file.buffer)
//          .resize(2000, 1333)
//          .toFormat('jpeg')
//          .jpeg({ quality: 90 })
//          .toFile(`starter/public/img/deals/${filename}`);

//       req.body.images.push(filename);
//    }));

//    next();
// });

// exports.aliasTopDeals = (req, res, next) => {
//    req.query.limit = '5';
//    req.query.sort = '-ratingAverage,price';
//    req.query.fields = 'name,price,summary,ratingAverage';
//    next();
// }

// const deals = JSON.parse(fs.readFileSync('./starter/dev-data/data/deals-simple.json'));

// exports.checkBody = (req, res, next) => {
//    if (!req.body.name || !req.body.price) {
//       return res.status(400).json({ status: 'fail', message: 'Missing name or price' });
//    }
//    next();
// }


