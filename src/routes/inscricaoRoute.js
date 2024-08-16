import { Router } from "express";

import { getAtivo, getEventos, getPopular, postInscrever } from "../controllers/inscricaoController.js";

const router = Router();
//Rotas
router.post("/inscrever", postInscrever);
router.get("/mais-popular", getPopular);
router.get("/palestrante-mais-ativo", getAtivo);
router.get("/meus-eventos", getEventos);

export default router;
