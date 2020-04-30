const express = require("express");

const subscribeController = require("./../controllers/subscribeController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(subscribeController.getAllSubscriber)
  .post(
    authController.restrictTo("user"),
    subscribeController.setDealUserIds,
    subscribeController.createSubscriber
  );

router
  .route("/:id")
  .get(subscribeController.getSubscriber)
  .patch(
    authController.restrictTo("admin", "user"),
    subscribeController.updateSubscriber
  )
  .delete(
    authController.restrictTo("admin", "user"),
    subscribeController.deleteSubscriber
  );
// router.route("/sub/:id").delete(subscribeController.delete);
module.exports = router;
