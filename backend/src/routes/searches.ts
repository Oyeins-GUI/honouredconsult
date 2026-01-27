import express, { Response } from 'express';
import { authenticateToken, isAdmin, AuthRequest } from '../middleware/auth';
import Search from '../models/Search';

const router = express.Router();

// Create search record (public)
router.post('/', async (req, res) => {
  try {
    const { query, filters } = req.body;

    const search = new Search({
      query,
      filters: {
        level: filters?.level,
        destination: filters?.destination,
        field: filters?.field,
      },
      searchedAt: new Date(),
    });

    await search.save();

    res.status(201).json({
      success: true,
      message: 'Search recorded successfully',
      data: search,
    });
  } catch (error: any) {
    console.error('Create search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record search',
      error: error.message,
    });
  }
});

// Get all searches (admin only)
router.get('/', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const searches = await Search.find()
      .sort({ searchedAt: -1 })
      .lean();

    res.json({
      success: true,
      data: searches.map(s => ({
        ...s,
        id: s._id.toString(),
        level: s.filters?.level,
        destination: s.filters?.destination,
        field: s.filters?.field
      })),
      count: searches.length,
    });
  } catch (error: any) {
    console.error('Get searches error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch searches',
      error: error.message,
    });
  }
});

// Get search analytics (admin only)
router.get('/analytics', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const totalSearches = await Search.countDocuments();
    
    const topDestinations = await Search.aggregate([
      { $match: { 'filters.destination': { $exists: true, $ne: null } } },
      { $group: { _id: '$filters.destination', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    const topFields = await Search.aggregate([
      { $match: { 'filters.field': { $exists: true, $ne: null } } },
      { $group: { _id: '$filters.field', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        totalSearches,
        topDestinations,
        topFields,
      },
    });
  } catch (error: any) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message,
    });
  }
});

export default router;
