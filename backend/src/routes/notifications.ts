import express, { Response } from 'express';
import { authenticateToken, isAdmin, AuthRequest } from '../middleware/auth';
import Notification from '../models/Notification';
import NotificationSettings from '../models/NotificationSettings';

const router = express.Router();

// Get notification settings (admin only)
router.get('/settings', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    let settings = await NotificationSettings.findOne();
    
    if (!settings) {
      // Create default settings if none exist
      settings = new NotificationSettings({
        ownerEmail: process.env.ADMIN_EMAIL || 'info@honouredconsult.com',
        enableNotifications: true,
        notifyOnSubmission: true,
        notifyOnApplication: true,
        notifyOnSearch: false,
        emailNotifications: true,
        pushNotifications: false,
      });
      await settings.save();
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    console.error('Get notification settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification settings',
      error: error.message,
    });
  }
});

// Update notification settings (admin only)
router.put('/settings', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    let settings = await NotificationSettings.findOne();

    if (!settings) {
      settings = new NotificationSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();

    res.json({
      success: true,
      message: 'Notification settings updated successfully',
      data: settings,
    });
  } catch (error: any) {
    console.error('Update notification settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification settings',
      error: error.message,
    });
  }
});

// Create notification
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { type, title, message, recipient, data } = req.body;

    const notification = new Notification({
      type,
      title,
      message,
      recipient,
      data,
    });

    await notification.save();

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification,
    });
  } catch (error: any) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: error.message,
    });
  }
});

// Get notification history (admin only)
router.get('/history', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .populate('recipient', 'name email')
      .lean();

    res.json({
      success: true,
      data: notifications,
      count: notifications.length,
    });
  } catch (error: any) {
    console.error('Get notification history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification history',
      error: error.message,
    });
  }
});

// Get user notifications
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await Notification.find({ recipient: req.user?.userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: notifications,
      count: notifications.length,
    });
  } catch (error: any) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message,
    });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user?.userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
      return;
    }

    res.json({
      success: true,
      data: notification,
    });
  } catch (error: any) {
    console.error('Mark notification read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      error: error.message,
    });
  }
});

// Delete notification (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: error.message,
    });
  }
});

export default router;
