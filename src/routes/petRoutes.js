import { Router } from "express";
import * as PetController from './../controllers/petController.js'

const router = Router();

router.get("/", PetController.listarTodos);
router.get("/:id", PetController.listarUm);
router.post("/", PetController.criar);
router.delete("/:id", BruxoController.apagar)
router.put("/:id", BruxoController.atualizar)

export default router