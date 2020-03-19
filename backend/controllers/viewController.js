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
exports.mainPage = (req, res) => {
    res.status(200).render('main');
}
exports.getMemberData = (req, res) => {
    res.status(200).render('members')
}