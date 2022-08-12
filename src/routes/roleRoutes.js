import { Router } from "express";
import { signup, signin, recover, change, refresh, profile } from "../controllers/users/authControllers.js";
const router = Router();

router.post("/signin", signin);
router.post("/refresh", refresh);
export default router;