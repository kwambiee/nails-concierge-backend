const express = require("express");
const { reviewController } = require("../../controllers");
const authenticateJWT = require("../../middleware/authenticateJWTMiddleware");

const router = express.Router();

// Review routes
router
  .route("/")
  .post(authenticateJWT, reviewController.createReview);

router
  .route("/:id")
  .get(authenticateJWT, reviewController.getReviewById)
  .put(authenticateJWT, reviewController.updateReviewInfo)
  .delete(authenticateJWT, reviewController.deleteReview);

router.get(
  "/technician/:id",
  authenticateJWT,
  reviewController.getTechnicianReviews
);

module.exports = router;
