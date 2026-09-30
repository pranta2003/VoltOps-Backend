import { Router } from "express";
import authRoutes from "./authRoutes";
import technicianRoutes from "./technicianRoutes";

const router = Router();

// Every route file gets mounted here under its own path prefix.
// As we build Milestone 2, 3, 4... we'll add one line per new feature:
//   router.use("/jobs", jobRoutes);
//   router.use("/customers", customerRoutes);
router.use("/auth", authRoutes);
router.use("/technicians", technicianRoutes);

export default router;
