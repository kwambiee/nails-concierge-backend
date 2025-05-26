const { notificationService } = require("../services");

const createNotification = async (req, res) => {
  try {
    const notificationData = req.body;
    const newNotification = await notificationService.createNotification(
      notificationData
    );
    res.status(201).json({ notification: newNotification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await notificationService.getNotificationById(
      notificationId
    );
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json({ notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateNotificationProfile = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notificationInfo = req.body;
    const updatedNotification =
      await notificationService.updateNotificationInfo(
        notificationId,
        notificationInfo
      );
    res.status(200).json({ notification: updatedNotification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    await notificationService.deleteNotification(notificationId);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUnreadNotificationsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notifications, totalNotifications } =
      await notificationService.getUnreadNotificationsByUser(userId);
    res.status(200).json({ notifications, totalNotifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notifications, totalNotifications } =
      await notificationService.getAllUserNotifications(userId);
    res.status(200).json({ notifications, totalNotifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotificationsByType = async (req, res) => {
  try {
    const userId = req.user.id;
    const type = req.params.type;
    const { notifications, totalNotifications } =
      await notificationService.getNotificationsByType(userId, type);
    res.status(200).json({ notifications, totalNotifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNotification,
  updateNotificationProfile,
  deleteNotification,
  getNotificationById,
  getUnreadNotificationsByUser,
  getAllUserNotifications,
  getNotificationsByType,
};
