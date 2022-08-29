import { Router } from "express";
import { users, addUserData, putUserData, typeUser, addTypeUser, updateTypeUser } from "../../controllers/users/userController.js";
const router = Router();

router.get("/", users);
router.post("/", addUserData);
router.put("/:_id", putUserData);

router.get("/type-user", typeUser);
router.post("/type-user", addTypeUser);
router.put("/type-user/:id", updateTypeUser);

export default router;