const Deal = require('./../schema/models/dealModel');
const Subscriber = require('./../schema/models/subscriberModel');
const User = require('./../schema/models/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');

exports.getLoginForm = (req, res) => {
    res.status(200).render('login')
}

exports.getSignupForm = (req, res) => {
    res.status(200).render('signup')
}

exports.getLikedDeals = catchAsync(async (req, res) => {
    const user = await User.findById(req.user).populate({
        path: 'likedDeals'
    });
    res.status(200).render('likedDeals',
        { user });
});

exports.getSubscriptions = catchAsync(async (req, res) => {
    const xyz = await User.findById(req.user).populate({
        path: 'subscribers'
    });
    //console.log(xyz.subscribers);

    // for (var i = 0; i <= xyz.subscribers.length; i++) {

    // xyz.subscribers[i].subscribedUser
    // const final = function () {
    //     xyz.subscribers.forEach(async function (el) {
    //         const test = await el.subscribedUser._id;
    //         console.log(test);
    //         return test;
    //     }
    //     )
    // };
    // console.log(a);
    // }

    const subs = await Subscriber.find({ user: req.user }).populate({
        path: 'subscribedDeals'
    });

    // console.log(subs[0].subscribedDeals);
    //console.log(subs[0].subscribedDeals.length);
    // for (var i = 0; i < xyz.subscribers.length; i++) {
    // const deals = await Deal.find({ user: xyz.subscribers[i].subscribedUser._id });
    // const deals = await Deal.find({ user: xyz.subscribers.subscribedUser });
    // }
    // console.log(deals);
    res.status(200).render('subscriptions',
        {
            xyz,
            subs
        });
});

exports.createNewDeal = (req, res) => {
    res.status(200).render('newDeal')
}

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
    const deals = await Deal.find({ user: req.params.id });

    res.status(200).render('members', {
        deals
    });
});

exports.dealPage = catchAsync(async (req, res, next) => {
    const deal = await Deal.findOne({ _id: req.params.id }).populate({
        path: 'reviews',
    });

    if (!deal) {
        return next(new appError('No Deal With That Id', 404));
    }

    res.status(200).render('deal', {
        deal
    });
});