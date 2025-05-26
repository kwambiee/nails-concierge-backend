const { Notification } = require("../models");

const createNotification = async (notificationData) => {
  const { user, message, read, type, relatedId } = notificationData;

  // Create the notification
  const newNotification = await Notification.create({
    user,
    message,
    read,
    type,
    relatedId,
  });
  return newNotification;
};

const getNotificationById = async (id) => {
  const notification = await Notification.findById(id);
  return notification;
};

const updateNotificationInfo = async (notificationId, notificationInfo) => {
  const { user, message, read, type, relatedId } = notificationInfo;
  const updatedNotification = await Notification.findByIdAndUpdate(
    notificationId,
    {
      user,
      message,
      read,
      type,
      relatedId,
    },
    { new: true }
  );
  return updatedNotification;
};

const deleteNotification = async (notificationId) => {
  const deletedNotification = await Notification.findByIdAndDelete(notificationId);
  return deletedNotification;
};

const getUnreadNotificationsByUser = async (userId) => {
  const notifications = await Notification.find({ user: userId, read: false });
  const totalNotifications = await Notification.countDocuments({ user: userId, read: false });
  return { notifications, totalNotifications };
};

const getAllUserNotifications = async (userId) => {
  const notifications = await Notification.find({ user: userId });
  const totalNotifications = await Notification.countDocuments({ user: userId });
  return { notifications, totalNotifications };
};
const getNotificationsByType = async (userId, type) => {
  const notifications = await Notification.find({ user: userId, type });
  const totalNotifications = await Notification.countDocuments({ user: userId, type });
  return { notifications, totalNotifications };
};

module.exports = {
  createNotification,
  getNotificationById,
  updateNotificationInfo,
  deleteNotification,
  getUnreadNotificationsByUser,
  getAllUserNotifications,
  getNotificationsByType,
};
