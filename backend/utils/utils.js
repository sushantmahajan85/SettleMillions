const random = function () {
    var min = 10000;
    var max = 99999;
    var otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp;
}

module.exports = random;