import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getPalestrantes = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM palestrantes`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao listar clientes" });
      return;
    }
    response.status(200).json(data);
  });
};

export const postPalestrante = (request, response) => {
  const { palestrante_id, nome, expertise } = request.body;

  if (!palestrante_id) {
    response.status(400).json({ err: "O ID do objeto é obrigatório" });
    return;
  }
  if (!nome) {
    response.status(400).json({ err: "O nome do objeto é obrigatório" });
    return;
  }
  if (!expertise) {
    response
      .status(400)
      .json({ err: "A área de especialização é obrigatória" });
    return;
  }

  const insertSql = /*sql*/ `
  INSERT INTO palestrantes (??, ??, ??)VALUES(?, ?, ?)`;
  const insertData = [
    "palestrante_id",
    "nome",
    "expertise",
    palestrante_id,
    nome,
    expertise,
  ];
  conn.query(insertSql, insertData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao cadastrar palestrante" });
      return;
    }
    response.status(201).json({ message: "Palestrante criado com sucesso" });
  });
};
