const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../schema/models/User');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const random = require('../utils/utils');

const signToken = id => jwt.sign({ id: id }, process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRESIN });

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phoneNo: req.body.phoneNo  
        });



        res.status(201).json({
            status: 'success',
            data: {
                newUser
            }  
        });



    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.verify = async (req, res, next) => {
    try {
        const { verification_token } = req.body;
        const user = await User.findOneAndUpdate({
            verification_token: verification_token,
            verification_token_time: { $gt: Date.now() }
        }, { verified: true }, { new: true, runValidators: true }
        );
        if (!user) {
            return next(new AppError('Wrong OTP', 400));
        }

        const token = signToken(user._id);
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000),
            // secure: true,
            httpOnly: true
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(200).json({
            status: 'success',
            token,
            data: {
                verification_token
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            data: {
                err
            }
        })
    }

}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide correct email and password', 400));
        }
        const user = await User.findOne({ email: email }).select('+password');
        if (!user || !(await user.verifyPassword(password, user.password)) || !(user.verified)) {
            return next(new AppError('No user found', 400));
        }

        const token = signToken(user._id);
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000),
            // secure: true,
            httpOnly: true
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(200).json({
            status: 'success',
            token
        });
    }
    catch (error) {
        console.log(error);
    }
};

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(new AppError('you are not logged in', 401));
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
            return next(new AppError('no user exist', 401));
        }
        req.user = freshUser;
        next();
    } catch (err) {
        console.log(err);
    }
};

exports.resend = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({
            email: email,
            verified: true
        });
        if (user) {
            return next(new AppError('hahahaa got u', 400));
        }
        await User.findOneAndDelete({ email: email });
        res.status(204).json({
            status: 'success',
            data: null
        })
        next();
    } catch (err) {
        console.log(err);
    }
}

