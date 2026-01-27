import express, { Response } from 'express';
import { authenticateToken, isAdmin, optionalAuth, AuthRequest } from '../middleware/auth';
import Blog from '../models/Blog';

const router = express.Router();

// Get all blogs (public - only published, admin - all)
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { category, tags, published } = req.query;
    
    const filter: any = {};
    
    // Non-admin users only see published blogs
    if (req.user?.role !== 'admin') {
      filter.published = true;
    } else if (published !== undefined) {
      filter.published = published === 'true';
    }
    
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: Array.isArray(tags) ? tags : [tags] };

    const blogs = await Blog.find(filter)
      .populate('author', 'name email')
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: blogs,
      count: blogs.length,
    });
  } catch (error: any) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message,
    });
  }
});

// Get blog by ID or slug (public - only published, admin - all)
router.get('/:identifier', optionalAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const identifier = req.params.identifier;
    
    // Check if identifier is valid MongoDB ObjectId
    const isObjectId = typeof identifier === 'string' && /^[0-9a-fA-F]{24}$/.test(identifier);
    
    const query: any = {
      $or: [
        ...(isObjectId ? [{ _id: identifier }] : []),
        { slug: identifier }
      ]
    };
    
    // Non-admin users only see published blogs
    if (req.user?.role !== 'admin') {
      query.published = true;
    }

    const blog = await Blog.findOne(query).populate('author', 'name email');

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
      return;
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    console.error('Get blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message,
    });
  }
});

// Create blog (admin only)
router.post('/', authenticateToken, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const blog = new Blog({
      ...req.body,
      author: req.user?.userId,
    });

    if (blog.published && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error: any) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog',
      error: error.message,
    });
  }
});

// Update blog (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
      return;
    }

    // If publishing for the first time, set publishedAt
    if (req.body.published && !blog.published) {
      req.body.publishedAt = new Date();
    }

    Object.assign(blog, req.body);
    await blog.save();

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error: any) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog',
      error: error.message,
    });
  }
});

// Delete blog (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog',
      error: error.message,
    });
  }
});

// Like blog (public)
router.post('/:id/like', async (req, res): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
      return;
    }

    blog.likes += 1;
    await blog.save();

    res.json({
      success: true,
      message: 'Blog liked successfully',
      data: { likes: blog.likes },
    });
  } catch (error: any) {
    console.error('Like blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like blog',
      error: error.message,
    });
  }
});

// Get blog categories (public)
router.get('/list/categories', async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { published: true });

    res.json({
      success: true,
      data: categories.sort(),
    });
  } catch (error: any) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message,
    });
  }
});

// Get blog tags (public)
router.get('/list/tags', async (req, res) => {
  try {
    const tags = await Blog.distinct('tags', { published: true });

    res.json({
      success: true,
      data: tags.sort(),
    });
  } catch (error: any) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags',
      error: error.message,
    });
  }
});

export default router;
