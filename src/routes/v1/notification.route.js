const express = require("express");
const { notificationController } = require("../../controllers");
const authenticateJWT = require("../../middleware/authenticateJWTMiddleware");

const router = express.Router();

// Notification routes
router
  .route("/")
  .post(authenticateJWT, notificationController.createNotification)
  .get(authenticateJWT, notificationController.getAllUserNotifications);

router
  .route("/:id")
  .get(authenticateJWT, notificationController.getNotificationById)
  .put(authenticateJWT, notificationController.updateNotificationInfo)
  .delete(authenticateJWT, notificationController.deleteNotification);

router.post(
  "/user/status",
  authenticateJWT,
  notificationController.getNotificationsByStatus
);

module.exports = router;
