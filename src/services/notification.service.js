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
    status: "unread",
  });
  return newNotification;
};

const getNotificationById = async (id) => {
  const notification = await Notification.findById(id);
  return notification;
};

const updateNotificationInfo = async (notificationId, notificationInfo) => {
  const { user, message, read, type, relatedId, status } = notificationInfo;
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

const getAllUserNotifications = async (userId) => {
  const notifications = await Notification.find({ user: userId });
  const totalNotifications = await Notification.countDocuments({ user: userId });
  return { notifications, totalNotifications };
};
const getNotificationsByStatus = async (userId, status) => {
  const notifications = await Notification.find({ user: userId, status });
  const totalNotifications = await Notification.countDocuments({ user: userId, status });
  return { notifications, totalNotifications };
};

module.exports = {
  createNotification,
  getNotificationById,
  updateNotificationInfo,
  deleteNotification,
  getAllUserNotifications,
  getNotificationsByStatus,
};
