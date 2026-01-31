import express, { Response } from "express";
import { authenticateToken, isAdmin, AuthRequest } from "../middleware/auth";
import Newsletter from "../models/Newsletter";
import Subscriber from "../models/Subscriber";
import { sendNewsletterEmail } from "../services/emailService";

const router = express.Router();

// Get all newsletters (public - only published, admin - all)
router.get("/", async (req, res): Promise<void> => {
   try {
      const filter: any = { published: true };

      const newsletters = await Newsletter.find(filter)
         .populate("author", "name email")
         .sort({ publishedAt: -1, createdAt: -1 })
         .lean();

      res.json({
         success: true,
         data: newsletters,
         count: newsletters.length,
      });
   } catch (error: any) {
      console.error("Get newsletters error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to fetch newsletters",
         error: error.message,
      });
   }
});

// Get all newsletters for admin
router.get(
   "/admin/all",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest, res: Response) => {
      try {
         const newsletters = await Newsletter.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 })
            .lean();

         res.json({
            success: true,
            data: newsletters,
            count: newsletters.length,
         });
      } catch (error: any) {
         console.error("Get all newsletters error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to fetch newsletters",
            error: error.message,
         });
      }
   },
);

// Get newsletter by ID (public - only published, admin - all)
router.get("/:id", async (req, res): Promise<void> => {
   try {
      const newsletter = await Newsletter.findById(req.params.id).populate(
         "author",
         "name email",
      );

      if (!newsletter) {
         res.status(404).json({
            success: false,
            message: "Newsletter not found",
         });
         return;
      }

      res.json({
         success: true,
         data: newsletter,
      });
   } catch (error: any) {
      console.error("Get newsletter error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to fetch newsletter",
         error: error.message,
      });
   }
});

// Create newsletter (admin only)
router.post(
   "/",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest, res: Response) => {
      try {
         const newsletter = new Newsletter({
            ...req.body,
            author: req.user?.userId,
         });

         if (newsletter.published && !newsletter.publishedAt) {
            newsletter.publishedAt = new Date();
         }

         await newsletter.save();

         res.status(201).json({
            success: true,
            message: "Newsletter created successfully",
            data: newsletter,
         });
      } catch (error: any) {
         console.error("Create newsletter error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to create newsletter",
            error: error.message,
         });
      }
   },
);

// Update newsletter (admin only)
router.patch(
   "/:id",
   authenticateToken,
   isAdmin,
   async (
      req: AuthRequest<
         { id: string },
         {},
         {
            published?: boolean;
            updateData: { published: boolean; publishedAt?: Date };
         }
      >,
      res: Response,
   ): Promise<void> => {
      try {
         const { published, updateData } = req.body;

         if (published !== undefined) {
            updateData.published = published;
            if (published) {
               const newsletter = await Newsletter.findById(req.params.id);
               if (newsletter && !newsletter.publishedAt) {
                  updateData.publishedAt = new Date();
               }
            }
         }

         const newsletter = await Newsletter.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true },
         ).populate("author", "name email");

         if (!newsletter) {
            res.status(404).json({
               success: false,
               message: "Newsletter not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "Newsletter updated successfully",
            data: newsletter,
         });
      } catch (error: any) {
         console.error("Update newsletter error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to update newsletter",
            error: error.message,
         });
      }
   },
);

// Delete newsletter (admin only)
router.delete(
   "/:id",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const newsletter = await Newsletter.findByIdAndDelete(req.params.id);

         if (!newsletter) {
            res.status(404).json({
               success: false,
               message: "Newsletter not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "Newsletter deleted successfully",
         });
      } catch (error: any) {
         console.error("Delete newsletter error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to delete newsletter",
            error: error.message,
         });
      }
   },
);

// Send newsletter to all subscribers (admin only)
router.post(
   "/:id/send",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const newsletter = await Newsletter.findById(req.params.id);

         if (!newsletter) {
            res.status(404).json({
               success: false,
               message: "Newsletter not found",
            });
            return;
         }

         if (!newsletter.published) {
            res.status(400).json({
               success: false,
               message: "Newsletter must be published before sending",
            });
            return;
         }

         // Get all active subscribers
         const subscribers = await Subscriber.find({ isActive: true });

         let successCount = 0;
         let failureCount = 0;

         // Send email to each subscriber
         for (const subscriber of subscribers) {
            const result = await sendNewsletterEmail(
               subscriber.email,
               newsletter.title,
               newsletter.content,
            );

            if (result) {
               successCount++;
            } else {
               failureCount++;
            }
         }

         // Update newsletter
         newsletter.sentToSubscribers = true;
         newsletter.recipientCount = successCount;
         await newsletter.save();

         res.json({
            success: true,
            message: `Newsletter sent to ${successCount} subscribers (${failureCount} failed)`,
            data: {
               successCount,
               failureCount,
               totalSubscribers: subscribers.length,
            },
         });
      } catch (error: any) {
         console.error("Send newsletter error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to send newsletter",
            error: error.message,
         });
      }
   },
);

export default router;
