import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const postFeedback = (request, response) => {
  const { feedback_id, participante_id, evento_id, nota, comentario } = request.body;

  if (!feedback_id) {
    response.status(400).json({ err: "O ID do objeto é obrigatório" });
    return;
  }
  if (!participante_id) {
    response.status(400).json({ err: "O ID do participante é obrigatório" });
    return;
  }
  if (!evento_id) {
    response.status(400).json({ err: "O ID do evento é obrigatório" });
    return;
  }
  if (!nota || nota > 10 || nota < 0) {
    response
      .status(400)
      .json({ err: "A nota do objeto é obrigatória e deve ser entre 0 e 10" });
    return;
  }
  if (!comentario) {
    response.status(400).json({ err: "O comentario do objeto é obrigatório" });
    return;
  }

  const insertSql = /*sql*/ `
    INSERT INTO feedbacks (??, ??, ??, ??, ??)VALUES(?, ?, ?, ?, ?)`;
  const inserData = [
    "feedback_id",
    "participante_id",
    "evento_id",
    "nota",
    "comentario",
    feedback_id,
    participante_id,
    evento_id,
    nota,
    comentario,
  ];
  conn.query(insertSql, inserData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao cadastrar feedback" });
      return;
    }
    response.status(201).json({ message: "feedback criado com sucesso" });
  });
};
