const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const router = express.Router();
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
router.get('/verification', viewController.getVerificationForm);
router.get('/recruitments', authController.protect, viewController.getRecruitmentsData);
router.get('/', viewController.mainPage);
router.get('/member', viewController.getMemberData);
router.get('/deal/:id', viewController.dealPage);
module.exports = router;