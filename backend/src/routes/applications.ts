import express, { Response } from 'express';
import { authenticateToken, isAdmin, AuthRequest } from '../middleware/auth';
import Application from '../models/Application';

const router = express.Router();

// Get all applications (admin) or user's applications
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const filter = req.user?.role === 'admin' 
      ? {} 
      : { user: req.user?.userId };

    const applications = await Application.find(filter)
      .populate('user', 'name email')
      .populate('course', 'title degree')
      .populate('university', 'name country')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: applications,
      count: applications.length,
    });
  } catch (error: any) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message,
    });
  }
});

// Get application by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('user', 'name email')
      .populate('course')
      .populate('university');

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Application not found',
      });
      return;
    }

    // Check if user owns this application or is admin
    if (req.user?.role !== 'admin' && application.user._id.toString() !== req.user?.userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error: any) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: error.message,
    });
  }
});

// Create application
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const application = new Application({
      ...req.body,
      user: req.user?.userId,
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application created successfully',
      data: application,
    });
  } catch (error: any) {
    console.error('Create application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create application',
      error: error.message,
    });
  }
});

// Update application
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Application not found',
      });
      return;
    }

    // Check if user owns this application or is admin
    if (req.user?.role !== 'admin' && application.user.toString() !== req.user?.userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    Object.assign(application, req.body);
    await application.save();

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: application,
    });
  } catch (error: any) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application',
      error: error.message,
    });
  }
});

// Submit application
router.post('/:id/submit', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Application not found',
      });
      return;
    }

    // Check if user owns this application
    if (application.user.toString() !== req.user?.userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    application.status = 'submitted';
    application.submittedAt = new Date();
    await application.save();

    res.json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error: any) {
    console.error('Submit application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message,
    });
  }
});

// Review application (admin only)
router.patch('/:id/review', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, notes } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        reviewedAt: new Date(),
        reviewedBy: req.user?.userId,
      },
      { new: true }
    );

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Application not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Application reviewed successfully',
      data: application,
    });
  } catch (error: any) {
    console.error('Review application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to review application',
      error: error.message,
    });
  }
});

// Delete application
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Application not found',
      });
      return;
    }

    // Check if user owns this application or is admin
    if (req.user?.role !== 'admin' && application.user.toString() !== req.user?.userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    await application.deleteOne();

    res.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: error.message,
    });
  }
});

export default router;
