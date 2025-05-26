const bcrypt = require("bcryptjs");
const { User } = require("../models");

const createLocalUser = async (userData) => {
  const { email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = await User.create({
    ...userData,
    email: email.toLowerCase(),
    password: hashedPassword,
    provider: "local",
  });

  return newUser;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  return user;
};

const findOrCreateOAuthUser = async (profile, provider) => {
  const { id, displayName, emails } = profile;

  // Check if the user already exists
  const existingUser = await User.findOne({ googleId: id });
  if (existingUser) {
    return existingUser;
  }
  // Create the user
  const newUser = await User.create({
    googleId: id,
    name: displayName,
    email: emails?.[0]?.value || null,
    provider: provider,
  });
  return newUser;
};

const updateUserInfo = async (userId, userInfo) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    profilePicture,
    role,
    password,
    email,
  } = userInfo;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      firstName,
      lastName,
      phone,
      address,
      profilePicture,
      role,
      password,
      email: email.toLowerCase(),
    },
    { new: true }
  );
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser;
};
const deleteUser = async (userId) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new Error("User not found");
  }
  return deletedUser;
};

const getUserByRole = async (role) => {
  const users = await User.find({ role });
  if (!users) {
    throw new Error("No users found with this role");
  }
  return users;
};

const getAllUsers = async () => {
  const users = await User.find();
  const totalUsers = await User.countDocuments();
  if (!users) {
    throw new Error("No users found");
  }
  return {
    users,
    totalUsers,
  };
};

module.exports = {
  createLocalUser,
  getUserByEmail,
  findOrCreateOAuthUser,
  getUserById,
  updateUserInfo,
  deleteUser,
  getUserByRole,
  getAllUsers,
};
