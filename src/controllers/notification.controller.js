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
const updateNotificationInfo = async (req, res) => {
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

const getNotificationsByStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const status = req.body.status;
    const { notifications, totalNotifications } =
      await notificationService.getNotificationsByStatus(userId, status);
    res.status(200).json({ notifications, totalNotifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNotification,
  updateNotificationInfo,
  deleteNotification,
  getNotificationById,
  getAllUserNotifications,
  getNotificationsByStatus,
};
