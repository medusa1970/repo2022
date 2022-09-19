import { Router } from "express";
import { pointAll, pointAdd, pointUpdate, pointDelete } from "../../controllers/points/pointControllers.js";

const router = Router();
// crear rutas para los puntos
router.get("/", pointAll);
router.post("/", pointAdd);
router.put("/:id", pointUpdate);
router.delete("/:id", pointDelete);

export default router;