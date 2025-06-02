const express = require("express");
const { technicianController } = require("../../controllers");
const authenticateJWT = require("../../middleware/authenticateJWTMiddleware");

const router = express.Router();

// Technician routes
router
  .route("/")
  .post(authenticateJWT, technicianController.createTechnician)
  .get(authenticateJWT, technicianController.getAllTechnicians);

router
  .route("/:id")
  .get(authenticateJWT, technicianController.getTechnicianById)
  .put(authenticateJWT, technicianController.updateTechnicianInfo)
  .delete(authenticateJWT, technicianController.deleteTechnician);

router.get(
  "/rates?minRate=:minRate&maxRate=:maxRate",
  authenticateJWT,
  technicianController.getTechniciansByRates
);

router.get(
  "/service/:serviceId",
  authenticateJWT,
  technicianController.getTechniciansByService
);

module.exports = router;
