import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if credentials match admin credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // For now, simple password comparison (in production, use bcrypt)
    // You can hash the password in .env using bcrypt if needed
    const isPasswordValid = password === adminPassword;

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: adminEmail,
        isAdmin: true,
        isOwner: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" },
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          email: adminEmail,
          isAdmin: true,
          isOwner: true,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

// Verify token endpoint
router.get("/verify", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    data: {
      user: req.user,
    },
  });
});

// Logout endpoint (client-side token removal)
router.post("/logout", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Logout successful",
  });
});

export default router;
