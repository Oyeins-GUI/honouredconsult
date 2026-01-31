import express, { Response } from "express";
import { authenticateToken, isAdmin, AuthRequest } from "../middleware/auth";
import Consultation from "../models/Consultation";
import {
   sendConsultationConfirmation,
   sendAdminNotification,
} from "../services/emailService";

const router = express.Router();

// Create consultation (public)
router.post("/", async (req, res): Promise<void> => {
   try {
      const {
         firstName,
         lastName,
         email,
         phone,
         country,
         destination,
         service,
         message,
      } = req.body;

      if (!firstName || !lastName || !email || !phone) {
         res.status(400).json({
            success: false,
            message: "First name, last name, email, and phone are required",
         });
         return;
      }

      const consultation = new Consultation({
         firstName,
         lastName,
         email,
         phone,
         country,
         destination,
         service,
         message,
         submittedAt: new Date(),
         status: "pending",
      });

      await consultation.save();

      // Immediately respond to the client
      res.status(201).json({
         success: true,
         message: "Consultation request submitted successfully",
         data: consultation,
      });

      // Send emails asynchronously in the background (fire-and-forget)
      setImmediate(() => {
         sendConsultationConfirmation(email, firstName, lastName).catch((err) => {
            console.error("Failed to send confirmation email:", err);
         });

         sendAdminNotification(email, firstName, lastName).catch((err) => {
            console.error("Failed to send admin notification email:", err);
         });
      });
   } catch (error: any) {
      console.error("Create consultation error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to submit consultation",
         error: error.message,
      });
   }
});

// Get all consultations (admin only)
router.get(
   "/",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest, res: Response) => {
      try {
         const consultations = await Consultation.find()
            .sort({ submittedAt: -1 })
            .lean();

         res.json({
            success: true,
            data: consultations.map((c) => ({
               ...c,
               id: c._id.toString(),
            })),
            count: consultations.length,
         });
      } catch (error: any) {
         console.error("Get consultations error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to fetch consultations",
            error: error.message,
         });
      }
   },
);

// Get consultation by ID (admin only)
router.get(
   "/:id",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const consultation = await Consultation.findById(req.params.id);

         if (!consultation) {
            res.status(404).json({
               success: false,
               message: "Consultation not found",
            });
            return;
         }

         res.json({
            success: true,
            data: consultation,
         });
      } catch (error: any) {
         console.error("Get consultation error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to fetch consultation",
            error: error.message,
         });
      }
   },
);

// Update consultation (admin only)
router.patch(
   "/:id",
   authenticateToken,
   isAdmin,
   async (
      req: AuthRequest<
         { id: string },
         {},
         { status?: string; notes?: string; contactMethod?: string }
      >,
      res: Response,
   ): Promise<void> => {
      try {
         const { status, notes, contactMethod } = req.body;

         const updateData: any = {};
         if (status) updateData.status = status;
         if (notes !== undefined) updateData.notes = notes;
         if (contactMethod) updateData.contactMethod = contactMethod;

         if (status === "reviewed") {
            updateData.reviewedAt = new Date();
            updateData.reviewedBy = req.user?.userId;
         }

         if (status === "contacted" || contactMethod) {
            updateData.contactedAt = new Date();
            updateData.contactedBy = req.user?.userId;
            if (!updateData.status) updateData.status = "contacted";
         }

         const consultation = await Consultation.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true },
         );

         if (!consultation) {
            res.status(404).json({
               success: false,
               message: "Consultation not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "Consultation updated successfully",
            data: consultation,
         });
      } catch (error: any) {
         console.error("Update consultation error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to update consultation",
            error: error.message,
         });
      }
   },
);

// Delete consultation (admin only)
router.delete(
   "/:id",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const consultation = await Consultation.findByIdAndDelete(
            req.params.id,
         );

         if (!consultation) {
            res.status(404).json({
               success: false,
               message: "Consultation not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "Consultation deleted successfully",
         });
      } catch (error: any) {
         console.error("Delete consultation error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to delete consultation",
            error: error.message,
         });
      }
   },
);

export default router;
