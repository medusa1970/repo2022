import { Router } from "express";
import { users, typeUser, addTypeUser, updateTypeUser } from "../../controllers/users/userController.js";
const router = Router();

router.get("/", users);

router.get("/type-user", typeUser);
router.post("/type-user", addTypeUser);
router.put("/type-user/:id", updateTypeUser);

export default router;