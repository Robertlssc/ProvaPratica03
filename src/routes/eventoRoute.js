import { Router } from "express";

import { postRegistrar, getAgenda, putEditar, deleteCancelar } from "../controllers/eventoController.js";

const router = Router();
//Rotas
router.post("/criar", postRegistrar);

router.get("/agenda", getAgenda);

router.put("/editar", putEditar);

router.delete("/cancelar", deleteCancelar)

export default router;
