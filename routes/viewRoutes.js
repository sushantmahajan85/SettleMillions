const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const router = express.Router();
router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);
router.get("/verification", viewController.getVerificationForm);
router.get(
  "/recruitments",
  authController.protect,
  viewController.getRecruitmentsData
);
router.get("/", viewController.mainPage);
router.get("/member/:id", viewController.getMemberData);
router.get("/deal/:dealId/postedBy/:sellerId", viewController.dealPage);
router.get("/likedDeals", authController.protect, viewController.getLikedDeals);
router.get(
  "/subscriptions",
  authController.protect,
  viewController.getSubscriptions
);
router.get("/newDeal", viewController.createNewDeal);
router.get("/recent", viewController.recently);
router.get("/updateUserSettings", viewController.updateUserSettings);

module.exports = router;
