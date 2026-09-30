import { Router } from "express";
import { listTechnicians, getMyTechnicianProfile } from "../controllers/technicianController";
import { requireAuth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();

// Only staff who dispatch/manage jobs can see the full technician list.
router.get("/", requireAuth, authorize("ADMIN", "DISPATCHER"), listTechnicians);

// A technician can only ever see their OWN profile through this route.
router.get("/me", requireAuth, authorize("TECHNICIAN"), getMyTechnicianProfile);

export default router;
