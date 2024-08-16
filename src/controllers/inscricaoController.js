import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import { response } from "express";

export const postInscrever = (request, response) => {
  const { inscricao_id, participante_id, evento_id } = request.body;

  if (!inscricao_id) {
    response.status(400).json({ err: "O Id do objeto é obrigatório" });
    return;
  }
  if (!participante_id) {
    response.status(400).json({ err: "O Id do participante é obrigatório" });
    return;
  }
  if (!evento_id) {
    response.status(400).json({ err: "O Id do evento é obrigatório" });
    return;
  }

  const insertSql = /*sql*/ `INSERT INTO inscricoes (??, ??, ??)VALUES(?, ?, ?)`;
  const inserData = [
    "inscricao_id",
    "participante_id",
    "evento_id",
    inscricao_id,
    participante_id,
    evento_id,
  ];
  conn.query(insertSql, inserData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao cadastrar inscricao" });
      return;
    }
    response.status(201).json({ message: "Inscricao criada com sucesso" });
  });
};

export const getPopular = (request, response) => {
  const sql = /*sql*/ `SELECT evento_id, COUNT(*) FROM inscricoes GROUP BY evento_id ORDER BY COUNT(*) DESC LIMIT 1`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao listar inscricoes" });
      return;
    }
    response.status(200).json(data);
  });
};

export const getAtivo = (request, response) => {
  const sql = /*sql*/ `SELECT palestrante_id, COUNT(*) FROM eventos GROUP BY palestrante_id ORDER BY COUNT(*) DESC LIMIT 1`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao listar inscricoes" });
      return;
    }
    response.status(200).json(data);
  });
};

export const getEventos = (request, response) => {
    const { participante_id } = request.body;

    const sql = /*sql*/ `SELECT * FROM inscricoes WHERE ?? = ?`;
    const sqlData = ["participante_id", participante_id]
  
    conn.query(sql, sqlData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao listar inscricoes" });
        return;
      }
      response.status(200).json(data);
    });
  };
