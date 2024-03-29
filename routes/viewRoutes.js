const express = require("express");
const viewController = require("../controllers/viewController");
const dealController = require("../controllers/dealController");
const authController = require("../controllers/authController");
const router = express.Router();

//router.get(viewController.getSignupApp);

router.use(authController.isLoggedIn);
router.get(
  "/updateUserSettings",
  authController.protect,
  viewController.updateUserSettings
);
router.get(
  "/subscriptions",
  authController.protect,
  viewController.getSubscriptions
);

router.get("/savedDeals", authController.protect, viewController.getLikedDeals);
router.get("/share/:id", viewController.createNewDeal);

router.get("/newDeal", viewController.createNewDeal);
router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);
router.get("/verification", viewController.getVerificationForm);
// router.get(
//   "/recruitments",
//   authController.protect,
//   viewController.getRecruitmentsData
// );

router.get("/search", viewController.autocomplete);
router.get("/pageDeal", viewController.pageDeal);
router.get("/newsDeal", viewController.newsDeal);
router.get("/logout", authController.logout);
router.get("/trending", viewController.getTrendingDeals);

router.get("/liveDeal", viewController.livePage);
router.get("/", viewController.mainPage);
router.get("/analytics", viewController.analytics);
router.get("/member/:id", viewController.getMemberData);
router.get("/:short", viewController.shortshort);
router.get("/deal/:dealId/postedBy/:sellerId", viewController.dealPage);
router.get("/forgotPassword", viewController.forgot);
router.get("/resetPassword/:bytes", viewController.reset);
router.get("/category/:cat", viewController.category);

router.get("/edit/:id", viewController.editDeal);
router.get("/recent", viewController.recently);

module.exports = router;
