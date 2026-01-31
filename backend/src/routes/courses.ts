import express, { Response } from "express";
import {
   authenticateToken,
   isAdmin,
   optionalAuth,
   AuthRequest,
} from "../middleware/auth";
import Course from "../models/Course";

const router = express.Router();

// Get all courses (public)
router.get("/", optionalAuth, async (req: AuthRequest, res: Response) => {
   try {
      const { degree, university, minFee, maxFee, tags } = req.query;

      const filter: any = {};
      if (degree) filter.degree = degree;
      if (university) filter.university = university;
      if (minFee || maxFee) {
         filter.tuitionFee = {};
         if (minFee) filter.tuitionFee.$gte = Number(minFee);
         if (maxFee) filter.tuitionFee.$lte = Number(maxFee);
      }
      if (tags) filter.tags = { $in: Array.isArray(tags) ? tags : [tags] };

      const courses = await Course.find(filter)
         .populate("university", "name country city logo")
         .sort({ createdAt: -1 })
         .lean();

      res.json({
         success: true,
         data: courses,
         count: courses.length,
      });
   } catch (error: any) {
      console.error("Get courses error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to fetch courses",
         error: error.message,
      });
   }
});

// Get course by ID (public)
router.get("/:id", async (req, res): Promise<void> => {
   try {
      const course = await Course.findById(req.params.id).populate(
         "university",
      );

      if (!course) {
         res.status(404).json({
            success: false,
            message: "Course not found",
         });
         return;
      }

      res.json({
         success: true,
         data: course,
      });
   } catch (error: any) {
      console.error("Get course error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to fetch course",
         error: error.message,
      });
   }
});

// Create course (admin only)
router.post(
   "/",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest, res: Response) => {
      try {
         const course = new Course(req.body);
         await course.save();

         res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
         });
      } catch (error: any) {
         console.error("Create course error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
         });
      }
   },
);

// Update course (admin only)
router.put(
   "/:id",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
         );

         if (!course) {
            res.status(404).json({
               success: false,
               message: "Course not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "Course updated successfully",
            data: course,
         });
      } catch (error: any) {
         console.error("Update course error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message,
         });
      }
   },
);

// Delete course (admin only)
router.delete(
   "/:id",
   authenticateToken,
   isAdmin,
   async (req: AuthRequest<{ id: string }>, res: Response): Promise<void> => {
      try {
         const course = await Course.findByIdAndDelete(req.params.id);

         if (!course) {
            res.status(404).json({
               success: false,
               message: "Course not found",
            });
            return;
         }

         res.json({
            success: true,
            message: "Course deleted successfully",
         });
      } catch (error: any) {
         console.error("Delete course error:", error);
         res.status(500).json({
            success: false,
            message: "Failed to delete course",
            error: error.message,
         });
      }
   },
);

// Search courses (public)
router.post("/search", async (req, res) => {
   try {
      const { query, filters } = req.body;

      const searchFilter: any = {};

      if (query) {
         searchFilter.$or = [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
         ];
      }

      if (filters) {
         if (filters.degree) searchFilter.degree = filters.degree;
         if (filters.university) searchFilter.university = filters.university;
         if (filters.minFee)
            searchFilter.tuitionFee = {
               ...searchFilter.tuitionFee,
               $gte: filters.minFee,
            };
         if (filters.maxFee)
            searchFilter.tuitionFee = {
               ...searchFilter.tuitionFee,
               $lte: filters.maxFee,
            };
      }

      const courses = await Course.find(searchFilter)
         .populate("university", "name country city logo")
         .sort({ createdAt: -1 })
         .lean();

      res.json({
         success: true,
         data: courses,
         count: courses.length,
      });
   } catch (error: any) {
      console.error("Search courses error:", error);
      res.status(500).json({
         success: false,
         message: "Failed to search courses",
         error: error.message,
      });
   }
});

export default router;
