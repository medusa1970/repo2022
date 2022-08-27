import { Router } from "express";
import { signup, signin, recover, change, refresh, profile, uploadFile } from "../../controllers/users/authControllers.js";
import { upload } from "../../middlewares/uploadMid.js";
const router = Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/recover", recover);
router.post("/change", change);
router.post("/refresh", refresh);
router.get("/profile", profile);
router.post("/upload", upload.single('file'), uploadFile);

export default router;