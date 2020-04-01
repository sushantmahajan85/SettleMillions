const fs = require('fs');
const express = require('express');

const dealController = require('./../controllers/dealController');
const authController = require('./../controllers/authController');

const likedDealRouter = require('./likedDealRoutes');
const reviewRouter = require('./reviewRoutes');

const router = express.Router({ mergeParams: true });
router.use('/:dealId/likedDeals', likedDealRouter);
router.use('/:dealId/reviews', reviewRouter);

router.route('/')
   .get(dealController.getAllDeals)
   .post(
      authController.protect,
      authController.restrictTo('user'),
      dealController.createDeal);

router.route('/:id')
   .get(dealController.getDeal)
   .patch(
      authController.protect,
      authController.restrictTo('admin'),
      // dealController.uploadDealImages,
      // dealController.resizeDealImages,
      dealController.updateDeal)
   .delete(authController.protect, authController.restrictTo('admin'), dealController.deleteDeal);


   router.route('/trending')
      .get(
         dealController.showTrending);
      
      


module.exports = router;