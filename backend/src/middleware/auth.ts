import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest<P = {}, B = {}, Q = {}> extends Request<P, B, Q> {
   user?: {
      userId: string;
      role: string;
      isAdmin?: boolean;
   };
}

export const authenticateToken = (
   req: AuthRequest,
   res: Response,
   next: NextFunction,
): void => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

   if (!token) {
      res.status(401).json({
         success: false,
         message: "Access token required",
      });
      return;
   }

   try {
      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET || "your-secret-key",
      ) as any;
      req.user = decoded;
      next();
   } catch (error) {
      res.status(403).json({
         success: false,
         message: "Invalid or expired token",
      });
      return;
   }
};

export const isAdmin = (
   req: AuthRequest,
   res: Response,
   next: NextFunction,
): void => {
   if (!req.user || req.user.role !== "admin") {
      res.status(403).json({
         success: false,
         message: "Admin access required",
      });
      return;
   }
   next();
};

export const optionalAuth = (
   req: AuthRequest,
   res: Response,
   next: NextFunction,
): void => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

   if (token) {
      try {
         const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "your-secret-key",
         ) as any;
         req.user = decoded;
      } catch (error) {
         // Token invalid but continue without auth
      }
   }
   next();
};
