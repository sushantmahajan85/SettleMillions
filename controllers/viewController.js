const Deal = require('./../schema/models/dealModel');
const Subscriber = require('./../schema/models/subscriberModel');
const User = require('./../schema/models/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');

let cookieCount = 0;
let cookieArray = ['one', 'two', 'three', 'four', 'five'];

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
    const deal = await Deal.findOne({ _id: req.params.dealId }).populate({
        path: 'reviews',
    });

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000),
        // secure: true,
        httpOnly: true
    };
<<<<<<< HEAD

    for (var i = 0; i <= 4; i++) {
        const hey = ['one', 'two', 'three', 'four', 'five'];
        for (var j = 0; j <= i; j++) {
            res.cookie(hey[i], deal._id, cookieOptions);
            break;
        }

        // console.log(req.cookies);
=======
    
    if(cookieCount === 5){
        
        req.cookies.five = req.cookies.four;
        req.cookies.four = req.cookies.three;
        req.cookies.three = req.cookies.two;
        req.cookies.two = req.cookies.one;
        cookieCount = 0;
>>>>>>> 22769348e18105de8c7e207a2106747a5f6e62e5
    }
    
    res.cookie(cookieArray[cookieCount], deal, cookieOptions);
    cookieCount++;

    const getCookie = req.cookies;
    console.log(getCookie);

    if (!deal) {
        return next(new AppError('No Deal With That Id', 404));
    }

    res.status(200).render('deal', {
        deal
    });
});