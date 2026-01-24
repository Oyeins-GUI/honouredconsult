import express from "express";
import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// In-memory storage (will be replaced with MongoDB later)
let notifications = [];
let notificationSettings = {
  ownerEmail: "info@honouredconsult.com",
  enableNotifications: true,
  notifyOnSubmission: true,
};

// Get notification settings (admin only)
router.get("/settings", authenticateToken, isAdmin, async (req, res) => {
  try {
    res.json({
      success: true,
      data: notificationSettings,
    });
  } catch (error) {
    console.error("Get notification settings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification settings",
      error: error.message,
    });
  }
});

// Update notification settings (admin only)
router.put("/settings", authenticateToken, isAdmin, async (req, res) => {
  try {
    notificationSettings = {
      ...notificationSettings,
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      message: "Notification settings updated successfully",
      data: notificationSettings,
    });
  } catch (error) {
    console.error("Update notification settings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notification settings",
      error: error.message,
    });
  }
});

// Create notification
router.post("/", async (req, res) => {
  try {
    const notification = {
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...req.body,
      sentAt: new Date().toISOString(),
      status: "sent",
    };

    notifications.push(notification);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Create notification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create notification",
      error: error.message,
    });
  }
});

// Get notification history (admin only)
router.get("/history", authenticateToken, isAdmin, async (req, res) => {
  try {
    const sortedNotifications = [...notifications].sort(
      (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime(),
    );

    res.json({
      success: true,
      data: sortedNotifications,
      count: sortedNotifications.length,
    });
  } catch (error) {
    console.error("Get notification history error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification history",
      error: error.message,
    });
  }
});

// Delete notification (admin only)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const notificationIndex = notifications.findIndex(
      (n) => n.id === req.params.id,
    );

    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notifications.splice(notificationIndex, 1);

    res.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete notification",
      error: error.message,
    });
  }
});

export default router;
