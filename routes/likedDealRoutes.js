const express = require('express');

const likeDealController = require('./../controllers/likeDealController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route('/')
    .get(likeDealController.getAllLikedDeals)
    .post(
        authController.restrictTo('user'),
        likeDealController.setDealUserIds,
        likeDealController.createLikedDeals);

router.route('/:id')
    .get(likeDealController.getLikedDeals)
    .patch(authController.restrictTo('admin', 'user'), likeDealController.updateLikedDeals)
    .delete(authController.restrictTo('admin', 'user'), likeDealController.deleteLikedDeals);

module.exports = router;
