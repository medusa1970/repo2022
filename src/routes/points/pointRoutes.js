import { Router } from "express";
import { points, addPoint, updatePoint, deletePoint } from "../../controllers/points/pointControllers.js";

const router = Router();
// crear rutas para los puntos
router.get("/", points);
router.post("/", addPoint);
router.put("/:id", updatePoint);
router.delete("/:id", deletePoint);

export default router;