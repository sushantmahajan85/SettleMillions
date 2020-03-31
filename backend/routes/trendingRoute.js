const express = require('express');

const catchAsync = require('./../utils/catchAsync');


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

module.exports = router;