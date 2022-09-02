import { Router } from "express";
import { users, addUserData, putUserData, addRole, typeUser, addTypeUser, updateTypeUser, positionGet, positionPost } from "../../controllers/users/userController.js";
const router = Router();

router.get("/", users);
router.post("/", addUserData);
router.put("/:_id", putUserData);

router.post("/role", addRole);

router.get("/type-user", typeUser);
router.post("/type-user", addTypeUser);
router.put("/type-user/:id", updateTypeUser);

router.get("/position", positionGet);
router.post("/position", positionPost);

export default router;