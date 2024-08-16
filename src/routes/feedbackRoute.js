import { Router } from "express";

import { postFeedback } from "../controllers/feedbackController.js";

const router = Router();
//Rotas
router.post("/feedback", postFeedback);

export default router;
