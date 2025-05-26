const { userService } = require("../services");

const getUserById = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const userInfo = req.body;
    const updatedUser = await userService.updateUserInfo(userId, userInfo);
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ error: "Email not provided" });
    }
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const {users, totalUsers} = await userService.getAllUsers();
    res.status(200).json({ users, totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserByRole = async (req, res) => {
  try {
    const role = req.body.role;
    if (!role) {
      return res.status(400).json({ error: "Role not provided" });
    }
    const users = await userService.getUserByRole(role);
    if (!users) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateUserProfile,
  deleteUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  getUserByRole,
};
