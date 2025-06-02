const express = require("express");
const { earningController } = require("../../controllers");
const authenticateJWT = require("../../middleware/authenticateJWTMiddleware");

const router = express.Router();

// Earning routes
router
  .route("/")
  .post(authenticateJWT, earningController.createEarning)
  .get(authenticateJWT, earningController.getAllEarnings);

router
  .route("/:id")
  .get(authenticateJWT, earningController.getEarningById)
  .put(authenticateJWT, earningController.updateEarningInfo)
  .delete(authenticateJWT, earningController.deleteEarning);

router.get(
  "/technician/:id",
  authenticateJWT,
  earningController.getTechnicianEarnings
);

module.exports = router;
