import express, { Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Register
router.post('/register', async (req, res): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, and password are required' 
      });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }
    
    const user = new User({ 
      name, 
      email, 
      password, 
      role: role || 'student' 
    });
    await user.save();
    
    const token = jwt.sign(
      { 
        userId: user._id.toString(), 
        role: user.role,
        isAdmin: user.role === 'admin'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' } as jwt.SignOptions
    );
    
    return res.status(201).json({ 
      success: true,
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        isAdmin: user.role === 'admin'
      } 
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Registration failed',
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }
    
    // Check for admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Check if admin user exists
      let adminUser = await User.findOne({ email, role: 'admin' });
      
      if (!adminUser) {
        // Create admin user if doesn't exist
        adminUser = new User({
          name: 'Admin',
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: 'admin'
        });
        await adminUser.save();
      }
      
      const token = jwt.sign(
        { 
          userId: adminUser._id.toString(), 
          role: 'admin',
          isAdmin: true,
          isOwner: true
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: process.env.JWT_EXPIRE || '7d' } as jwt.SignOptions
      );
      
      return res.json({ 
        success: true,
        token, 
        user: { 
          id: adminUser._id, 
          name: adminUser.name, 
          email: adminUser.email, 
          role: 'admin',
          isAdmin: true,
          isOwner: true
        } 
      });
    }
    
    // Regular user login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }
    
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }
    
    const token = jwt.sign(
      { 
        userId: user._id.toString(), 
        role: user.role,
        isAdmin: user.role === 'admin'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' } as jwt.SignOptions
    );
    
    return res.json({ 
      success: true,
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        isAdmin: user.role === 'admin'
      } 
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Login failed',
      error: error.message 
    });
  }
});

// Verify token
router.get('/verify', authenticateToken, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    return res.json({ 
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin'
      }
    });
  } catch (error: any) {
    console.error('Verify error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Verification failed',
      error: error.message 
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ 
    success: true,
    message: 'Logged out successfully' 
  });
});

export default router;