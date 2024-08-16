import { Router } from "express";

import {
  getPalestrantes,
  postPalestrante,
} from "../controllers/palestranteController.js";

const router = Router();
//Rotas
router.get("/palestrantes", getPalestrantes);
router.post("/palestrantes", postPalestrante);

export default router;
