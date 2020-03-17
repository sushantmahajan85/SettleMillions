const express = require('express');

const userController = require('../controllers/userControllers');
const authController = require('../controllers/authControllers');

//bring back the user router from appjs
const router = express.Router();

router.route('/signup').delete(authController.resend).post(authController.signUp);
router.post('/verify', authController.verify);

router.post('/login', authController.login);

// router.post('/resend', authController.resend);
router.get('/', userController.getAllUsers);

module.exports = router;