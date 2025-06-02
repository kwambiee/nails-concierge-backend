const express = require("express");
const { serviceController } = require("../../controllers");
const authenticateJWT = require("../../middleware/authenticateJWTMiddleware");

const router = express.Router();

// Service routes
router
  .route("/")
  .post(authenticateJWT, serviceController.createService)
  .get(authenticateJWT, serviceController.getAllServices);

router
  .route("/:id")
  .get(authenticateJWT, serviceController.getServiceById)
  .put(authenticateJWT, serviceController.updateServiceInfo)
  .delete(authenticateJWT, serviceController.deleteService);

router.get(
  "/service/:id",
  authenticateJWT,
  serviceController.getTechnicianServices
);

module.exports = router;
