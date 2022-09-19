import { Router } from "express";
import { users, addUserData, putUserData} from "../../controllers/users/userController.js";
import { roleAll, roleAdd, roleUpdate, roleDelete} from "../../controllers/users/userController.js";
const router = Router();

router.get("/", users);
router.post("/", addUserData);
router.put("/:_id", putUserData);

router.post("/role", roleAdd);
router.get("/role", roleAll);
router.put("/role/:_id", roleUpdate);
router.delete("/role/:_id", roleDelete);

export default router;