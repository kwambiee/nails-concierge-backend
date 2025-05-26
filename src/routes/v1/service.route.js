const express = require('express');
const passport = require('passport');
const { userController } = require("../../controllers");

const router = express.Router();
const auth = passport.authenticate("jwt", { session: false });



router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.post("/email", auth, userController.getUserByEmail);
router.put("/:id", auth, userController.updateUserProfile);
router.delete("/:id", auth, userController.deleteUser);
router.post("/roles", auth, userController.getUserByRole);


module.exports = router;