import { Router } from "express";

import { postParticipante } from "../controllers/participanteController.js";

const router = Router();
//Rotas
router.post("/participantes/registrar", postParticipante);

export default router;
