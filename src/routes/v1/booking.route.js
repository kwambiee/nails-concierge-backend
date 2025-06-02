const express = require("express");
const { bookingController } = require("../../controllers");
const authenticateJWT = require("../../middleware/authenticateJWTMiddleware");

const router = express.Router();

// Booking routes
router
  .route("/")
  .post(authenticateJWT, bookingController.createBooking)
  .get(authenticateJWT, bookingController.getAllBookings);

router
  .route("/:id")
  .get(authenticateJWT, bookingController.getBookingById)
  .put(authenticateJWT, bookingController.updateBookingInfo)
  .delete(authenticateJWT, bookingController.deleteBooking);

router.get(
  "/technician/:id",
  authenticateJWT,
  bookingController.getTechnicianBookings
);
router.get("/client/:id", authenticateJWT, bookingController.getClientBookings);

module.exports = router;
