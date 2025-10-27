import { Router } from "express";
import * as PetController from './../controllers/petController.js'

const router = Router();

router.get("/", PetController.listarTodos);
router.get("/:id", PetController.listarUm);
router.post("/", PetController.criar);

export default router