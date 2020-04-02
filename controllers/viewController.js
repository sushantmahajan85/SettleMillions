const Deal = require('./../schema/models/dealModel');
const catchAsync = require('./../utils/catchAsync');

exports.getLoginForm = (req, res) => {
    res.status(200).render('login')
}

exports.getSignupForm = (req, res) => {
    res.status(200).render('signup')
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
exports.getMemberData = (req, res) => {
    res.status(200).render('members')
}
exports.dealPage = (req, res) => {
    res.status(200).render('deal');
}