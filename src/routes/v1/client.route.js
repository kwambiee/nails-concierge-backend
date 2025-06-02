const express = require("express");
const { clientController } = require("../../controllers");
const authenticateJWT = require("../../middleware/authenticateJWTMiddleware");

const router = express.Router();

// Client routes
router
  .route("/")
  .post(authenticateJWT, clientController.createClient)
  .get(authenticateJWT, clientController.getAllClients);

router
  .route("/:id")
  .get(authenticateJWT, clientController.getClientById)
  .put(authenticateJWT, clientController.updateClientInfo)
  .delete(authenticateJWT, clientController.deleteClient);

router.get(
  "/:id/favorite",
  authenticateJWT,
  clientController.getClientFavoriteService
);

module.exports = router;
