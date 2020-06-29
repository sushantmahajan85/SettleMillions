const express = require("express");

const testController = require("./../controllers/testController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

// router.use(authController.protect);

router
  .route("/")
  .get(testController.getAllTests)
  .post(
    // authController.restrictTo("user"),
    // reviewController.setDealUserIds,
    testController.createTest
  );

router.route("/signupApp").get(testController.getSignUp).post(testController.signUpApp);
router.post("/loginApp", testController.loginApp);

router
  .route("/:id")
  .get(testController.getTest)
  .patch(
    // authController.restrictTo("admin", "user"),
    testController.updateTest
  )
  .delete(
    // authController.restrictTo("admin", "user"),
    testController.deleteTest
  );

module.exports = router;
