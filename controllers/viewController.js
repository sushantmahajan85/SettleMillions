const Deal = require('./../schema/models/dealModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');

exports.getLoginForm = (req, res) => {
    res.status(200).render('login')
}

exports.getSignupForm = (req, res) => {
    res.status(200).render('signup')
}

exports.getLikedDeals = catchAsync(async (req, res) => {
    const deals = await Deal.find();
    res.status(200).render('likedDeals',
        { deals });
});

exports.getSubscriptions = catchAsync(async (req, res) => {
    const deals = await Deal.find();
    res.status(200).render('subscriptions',
        { deals });
});

exports.getVerificationForm = (req, res) => {
    res.status(200).render('verification')
}

exports.getRecruitmentsData = (req, res) => {
    res.status(200).render('recruitments');
}

exports.mainPage = catchAsync(async (req, res) => {
    const deals = await Deal.find();
    res.status(200).render('main',
        { deals });
});

exports.getMemberData = catchAsync(async (req, res) => {
    const deals = await Deal.find({ seller: req.params.id });

    res.status(200).render('members', {
        deals
    });
});

exports.dealPage = catchAsync(async (req, res, next) => {
    const deal = await Deal.findOne({ _id: req.params.id });

    if (!deal) {
        return next(new appError('No Deal With That Id', 404));
    }

    res.status(200).render('deal', {
        deal
    });
});