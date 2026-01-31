import express, { Response } from "express";
import { authenticateToken, isAdmin, AuthRequest } from "../middleware/auth";
import Subscriber from "../models/Subscriber";

const router = express.Router();

// Subscribe to newsletter (public)
router.post("/subscribe", async (req, res): Promise<void> => {
   try {
      const { email, name } = req.body;

      if (!email) {
         res.status(400).json({
            success: false,
            message: "Email is required",
         });
         return;
      }

      // Check if already subscribed
      let subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

      if (subscriber) {
         if (subscriber.isActive) {
            res.status(400).json({
               success: false,
               message: "Email is already subscribed",
            });
            return;
         } else {
            // Re-activate subscription
            subscriber.isActive = true;
            subscriber.subscribedAt = new Date();
            subscriber.unsubscribedAt = undefined;
            await subscriber.save();

            res.json({
               success: true,
               message: "Subscription reactivated successfully",
            });
            return;
         }
      }

      // Create new subscriber
      subscriber = new Subscriber({
         email: email.toLowerCase(),
         name,
         subscribedAt: new Date(),
         isActive: true,
      });

      await subscriber.save();

      res.status(201).json({
         success: true,
         message: "Successfully subscribed to newsletter",
      });
   } catch (error: any) {
      console.error("Subscribe error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to subscribe",
         error: error.message,
      });
   }
});

// Unsubscribe from newsletter (public)
router.post("/unsubscribe", async (req, res): Promise<void> => {
   try {
      const { email } = req.body;

      if (!email) {
         res.status(400).json({
            success: false,
            message: "Email is required",
         });
         return;
      }

      const subscriber = await Subscriber.findOne({
         email: email.toLowerCase(),
      });

      if (!subscriber) {
         res.status(404).json({
            success: false,
            message: "Email not found in subscribers list",
         });
         return;
      }

      subscriber.isActive = false;
      subscriber.unsubscribedAt = new Date();
      await subscriber.save();

      res.json({
         success: true,
         message: "Successfully unsubscribed from newsletter",
      });
   } catch (error: any) {
      console.error("Unsubscribe error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to unsubscribe",
         error: error.message,
      });
   }
});

// Get all subscribers (admin only)
router.get(
   "/",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest, res: Response) => {
      try {
         const { active } = req.query;

         const filter: any = {};
         if (active !== undefined) {
            filter.isActive = active === "true";
         }

         const subscribers = await Subscriber.find(filter)
            .sort({ subscribedAt: -1 })
            .lean();

         res.json({
            success: true,
            data: subscribers,
            count: subscribers.length,
         });
      } catch (error: any) {
         console.error("Get subscribers error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to fetch subscribers",
            error: error.message,
         });
      }
   },
);

// Delete subscriber (admin only)
router.delete(
   "/:id",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const subscriber = await Subscriber.findByIdAndDelete(req.params.id);

         if (!subscriber) {
            res.status(404).json({
               success: false,
               message: "Subscriber not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "Subscriber deleted successfully",
         });
      } catch (error: any) {
         console.error("Delete subscriber error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to delete subscriber",
            error: error.message,
         });
      }
   },
);

export default router;
