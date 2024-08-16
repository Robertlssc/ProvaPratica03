import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const postParticipante = (request, response) => {
  const { participante_id, nome, email } = request.body;

  const checkEmailSQL = /*sql*/ `SELECT * FROM participantes WHERE ?? = ?`;
  const checkEmailData = ["email", email];

  conn.query(checkEmailSQL, checkEmailData, (err, data) => {
    if (err) {
      console.log(err);
      response.status(500).json({ err: "Não foi possível buscar usuario" });
      return;
    }
    if (data.length > 0) {
      response.status(409).json({ err: "E-mail já está em uso!" });
      return;
    }

    if (!participante_id) {
      response.status(400).json({ err: "O ID do objeto é obrigatório" });
      return;
    }

    if (!nome) {
      response.status(400).json({ err: "O nome do objeto é obrigatório" });
      return;
    }

    if (!email) {
      response.status(400).json({ err: "O email do objeto é obrigatório" });
      return;
    }

    const insertSql = /*sql*/ `
  INSERT INTO participantes (??, ??, ??)VALUES(?, ?, ?)`;
    const insertData = [
      "participante_id",
      "nome",
      "email",
      participante_id,
      nome,
      email,
    ];
    conn.query(insertSql, insertData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao cadastrar participante" });
        return;
      }
      response.status(201).json({ message: "participante criado com sucesso" });
    });
  });
};
