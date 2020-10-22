const express = require("express");
const viewController = require("../controllers/viewController");
const dealController = require("../controllers/dealController");
const authController = require("../controllers/authController");
const router = express.Router();

//router.get(viewController.getSignupApp);

router.get("/liveDeal", viewController.livePage);
router.use(authController.isLoggedIn);

router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);
router.get("/verification", viewController.getVerificationForm);
router.get(
  "/recruitments",
  authController.protect,
  viewController.getRecruitmentsData
);
router.get("/", viewController.mainPage);
router.get("/analytics", viewController.analytics);
router.get("/member/:id", viewController.getMemberData);
router.get("/deal/:dealId/postedBy/:sellerId", viewController.dealPage);
router.get("/forgotPassword", viewController.forgot);
router.get("/resetPassword/:bytes", viewController.reset);
router.get("/trending", viewController.getTrendingDeals);
router.get("/likedDeals", authController.protect, viewController.getLikedDeals);
router.get(
  "/subscriptions",
  authController.protect,
  viewController.getSubscriptions
);
router.get("/category/:cat", viewController.category);
router.get("/search", viewController.autocomplete);
router.get("/:short", viewController.shortshort);
router.get("/logout", authController.logout);
router.get("/newDeal", viewController.createNewDeal);
router.get("/edit/:id", viewController.editDeal);
router.get("/recent", viewController.recently);
router.get(
  "/updateUserSettings",
  authController.protect,
  viewController.updateUserSettings
);
module.exports = router;
