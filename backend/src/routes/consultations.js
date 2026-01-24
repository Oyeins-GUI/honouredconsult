import express from "express";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// In-memory storage (will be replaced with MongoDB later)
let consultations = [];

// Validation rules
const consultationValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
];

// Create consultation
router.post("/", consultationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const consultation = {
      id: `consult-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...req.body,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    consultations.push(consultation);

    res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully",
      data: consultation,
    });
  } catch (error) {
    console.error("Create consultation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit consultation",
      error: error.message,
    });
  }
});

// Get all consultations (admin only)
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const sortedConsultations = [...consultations].sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    );

    res.json({
      success: true,
      data: sortedConsultations,
      count: sortedConsultations.length,
    });
  } catch (error) {
    console.error("Get consultations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch consultations",
      error: error.message,
    });
  }
});

// Get single consultation (admin only)
router.get("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const consultation = consultations.find((c) => c.id === req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    res.json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    console.error("Get consultation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch consultation",
      error: error.message,
    });
  }
});

// Update consultation status (admin only)
router.patch("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const consultationIndex = consultations.findIndex(
      (c) => c.id === req.params.id,
    );

    if (consultationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    consultations[consultationIndex] = {
      ...consultations[consultationIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      message: "Consultation updated successfully",
      data: consultations[consultationIndex],
    });
  } catch (error) {
    console.error("Update consultation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update consultation",
      error: error.message,
    });
  }
});

// Delete consultation (admin only)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const consultationIndex = consultations.findIndex(
      (c) => c.id === req.params.id,
    );

    if (consultationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    consultations.splice(consultationIndex, 1);

    res.json({
      success: true,
      message: "Consultation deleted successfully",
    });
  } catch (error) {
    console.error("Delete consultation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete consultation",
      error: error.message,
    });
  }
});

export default router;
