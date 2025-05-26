const express = require("express");
const { userController } = require("../../controllers");
const  authenticateJWT = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateJWT, userController.getAllUsers);
router.get("/:id", authenticateJWT, userController.getUserById);
router.post("/email", authenticateJWT, userController.getUserByEmail);
router.put("/:id", authenticateJWT, userController.updateUserProfile);
router.delete("/:id", authenticateJWT, userController.deleteUser);
router.post("/roles", authenticateJWT, userController.getUserByRole);

module.exports = router;
