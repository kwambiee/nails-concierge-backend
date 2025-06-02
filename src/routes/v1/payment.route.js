const express = require("express");
const { paymentController } = require("../../controllers");
const authenticateJWT = require("../../middleware/authenticateJWTMiddleware");

const router = express.Router();

// Payment routes
router
  .route("/")
  .post(authenticateJWT, paymentController.createPayment)
  .get(authenticateJWT, paymentController.getAllPayments);

router
  .route("/:id")
  .get(authenticateJWT, paymentController.getPaymentById)
  .put(authenticateJWT, paymentController.updatePaymentInfo)
  .delete(authenticateJWT, paymentController.deletePayment);

router.get("/user", authenticateJWT, paymentController.getAllUserPayments);

module.exports = router;
