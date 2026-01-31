import express, { Response } from "express";
import {
   authenticateToken,
   isAdmin,
   optionalAuth,
   AuthRequest,
} from "../middleware/auth";
import University from "../models/University";

const router = express.Router();

// Get all universities (public)
router.get("/", optionalAuth, async (req: AuthRequest, res: Response) => {
   try {
      const { country, city } = req.query;

      const filter: any = {};
      if (country) filter.country = country;
      if (city) filter.city = city;

      const universities = await University.find(filter)
         .sort({ "ranking.world": 1, name: 1 })
         .lean();

      res.json({
         success: true,
         data: universities,
         count: universities.length,
      });
   } catch (error: any) {
      console.error("Get universities error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to fetch universities",
         error: error.message,
      });
   }
});

// Get university by ID (public)
router.get("/:id", async (req, res): Promise<void> => {
   try {
      const university = await University.findById(req.params.id);

      if (!university) {
         res.status(404).json({
            success: false,
            message: "University not found",
         });
         return;
      }

      res.json({
         success: true,
         data: university,
      });
   } catch (error: any) {
      console.error("Get university error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to fetch university",
         error: error.message,
      });
   }
});

// Get countries list (public)
router.get("/list/countries", async (req, res) => {
   try {
      const countries = await University.distinct("country");

      res.json({
         success: true,
         data: countries.sort(),
      });
   } catch (error: any) {
      console.error("Get countries error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to fetch countries",
         error: error.message,
      });
   }
});

// Create university (admin only)
router.post(
   "/",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest, res: Response) => {
      try {
         const university = new University(req.body);
         await university.save();

         res.status(201).json({
            success: true,
            message: "University created successfully",
            data: university,
         });
      } catch (error: any) {
         console.error("Create university error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to create university",
            error: error.message,
         });
      }
   },
);

// Update university (admin only)
router.put(
   "/:id",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const university = await University.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
         );

         if (!university) {
            res.status(404).json({
               success: false,
               message: "University not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "University updated successfully",
            data: university,
         });
      } catch (error: any) {
         console.error("Update university error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to update university",
            error: error.message,
         });
      }
   },
);

// Delete university (admin only)
router.delete(
   "/:id",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const university = await University.findByIdAndDelete(req.params.id);

         if (!university) {
            res.status(404).json({
               success: false,
               message: "University not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "University deleted successfully",
         });
      } catch (error: any) {
         console.error("Delete university error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to delete university",
            error: error.message,
         });
      }
   },
);

export default router;
