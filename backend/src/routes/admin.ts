import express, { Response } from 'express';
import { authenticateToken, isAdmin, AuthRequest } from '../middleware/auth';
import User from '../models/User';
import Consultation from '../models/Consultation';
import Application from '../models/Application';
import Course from '../models/Course';
import University from '../models/University';
import Search from '../models/Search';
import Blog from '../models/Blog';

const router = express.Router();

// Get dashboard statistics (admin only)
router.get('/stats', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalUsers,
      totalConsultations,
      pendingConsultations,
      totalApplications,
      pendingApplications,
      totalCourses,
      totalUniversities,
      totalSearches,
      totalBlogs,
      publishedBlogs,
    ] = await Promise.all([
      User.countDocuments(),
      Consultation.countDocuments(),
      Consultation.countDocuments({ status: 'pending' }),
      Application.countDocuments(),
      Application.countDocuments({ status: { $in: ['draft', 'submitted'] } }),
      Course.countDocuments(),
      University.countDocuments(),
      Search.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ published: true }),
    ]);

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
        },
        consultations: {
          total: totalConsultations,
          pending: pendingConsultations,
        },
        applications: {
          total: totalApplications,
          pending: pendingApplications,
        },
        courses: {
          total: totalCourses,
        },
        universities: {
          total: totalUniversities,
        },
        searches: {
          total: totalSearches,
        },
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
        },
      },
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message,
    });
  }
});

// Get all users (admin only)
router.get('/users', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
});

// Get user by ID (admin only)
router.get('/users/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message,
    });
  }
});

// Update user (admin only)
router.put('/users/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message,
    });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message,
    });
  }
});

// Get recent activity (admin only)
router.get('/activity', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const [recentConsultations, recentApplications, recentSearches] = await Promise.all([
      Consultation.find()
        .sort({ submittedAt: -1 })
        .limit(limit)
        .lean(),
      Application.find()
        .populate('user', 'name email')
        .populate('course', 'title')
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean(),
      Search.find()
        .sort({ searchedAt: -1 })
        .limit(limit)
        .lean(),
    ]);

    res.json({
      success: true,
      data: {
        consultations: recentConsultations,
        applications: recentApplications,
        searches: recentSearches,
      },
    });
  } catch (error: any) {
    console.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity',
      error: error.message,
    });
  }
});

export default router;
