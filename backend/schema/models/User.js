const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');
const random = require('../../utils/utils');
const sendEmail = require('../../utils/email');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email.'],
        validate: {
            validator: function (val) {
                return val.endsWith("thapar.edu");
            },
            message: 'Enter thapar.edu id'
        }
    },
    phoneNo: {
        type: String,
        required: true,
        minlength: [10, 'Contact number is not correct'],
        maxlength: [10, 'Contact number is not correct'],
    },
    name: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        // required: true,
        default: false
    },
    verification_token: {
        type: Number
    },
    verification_token_time: {
        type: Date
    }
});


userSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 12);
    this.verification_token = random();
    this.verification_token_time = Date.now() + 10 * 60 * 1000;
    this.timeStamp = Date.now();
    next();
});
userSchema.post('save', async function () {
    const message = `Here is your 5 digit OTP : ${this.verification_token}`;

    await sendEmail({
        email: this.email,
        subject: 'your 5 digit otp valid for 10 mins only',
        message
    });
});
userSchema.methods.verifyPassword = async function (LoginPassword, signUpPassword) {
    return await bcrypt.compare(LoginPassword, signUpPassword);
}


// userSchema.methods.emailVerify = function () {
//     this.verification_token = random();
//     this.verification_token_time = Date.now() + 10 * 1000 * 60;
// }

const User = mongoose.model('User', userSchema);
module.exports = User;