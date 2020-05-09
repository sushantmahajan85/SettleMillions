const express = require('express');

const reportController = require('./../controllers/reportController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route('/')
    .get(reportController.getAllReports)
    .post(
        // authController.restrictTo('user'),
        //reportController.setDealUserIds,
        reportController.createReport)
    .get(reportController.getReport)
    .patch(authController.restrictTo('admin', 'user'), reportController.updateReport)
    .delete(authController.restrictTo('admin', 'user'), reportController.deleteReport);    

module.exports = router;
