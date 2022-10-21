import { Router } from "express";
import { users, addUserData, putUserData} from "../../controllers/users/userController.js";
import { roleAll, roleAdd, roleUpdate, roleDelete, createAreaInRole, UpdateareaInRole, createPositionAreaInRole, createAccessAreaInRole, createRouteAccessAreaInRole} from "../../controllers/users/userController.js";
import { roleUserAdd, roleUserGet} from "../../controllers/users/userController.js";

const router = Router();

router.get("/", users);
router.post("/", addUserData);
router.put("/:_id", putUserData);

// rutas para roles
router.post("/role", roleAdd);
router.get("/role", roleAll);
router.put("/role/:_id", roleUpdate);
router.delete("/role/:_id", roleDelete);
router.post("/role-area/:_id", createAreaInRole);
router.put("/role-area/:_id", UpdateareaInRole);
router.post("/role-area-position/:idType/:idArea", createPositionAreaInRole);
router.post("/role-area-access/:idType/:idArea", createAccessAreaInRole);
router.post("/role-area-access-route/:idType/:idArea/:idAccess", createRouteAccessAreaInRole);

// rutas para roles de usuarios
router.post("/role-user", roleUserAdd);
router.get("/role-user/:_id", roleUserGet);

export default router;