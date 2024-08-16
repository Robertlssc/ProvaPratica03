import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const postRegistrar = (request, response) => {
  const { evento_id, titulo, data, palestrante_id } = request.body;
  console.log(palestrante_id);

  if (!evento_id) {
    response.status(400).json({ err: "O ID do objeto é obrigatório" });
    return;
  }
  if (!titulo) {
    response.status(400).json({ err: "O titulo do objeto é obrigatório" });
    return;
  }
  if (!data) {
    response.status(400).json({ err: "A data do objeto é obrigatória" });
    return;
  }
  if (!palestrante_id) {
    response.status(400).json({ err: "O Id do palestrante é obrigatório" });
    return;
  }

  // const palestranteInfo = /*sql*/ `SELECT * FROM palestrantes WHERE palestrante_id = "${palestrante_id[0]}"`;
  // console.log(palestranteInfo);

  // console.log(palestrante_id[0]);

  const insertSql = /*sql*/ `
    INSERT INTO eventos (??, ??, ??, ??)VALUES(?, ?, ?, ?)`;
  const insertData = [
    "evento_id",
    "titulo",
    "data",
    "palestrante_id",
    evento_id,
    titulo,
    data,
    palestrante_id,
  ];
  conn.query(insertSql, insertData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao cadastrar evento" });
      return;
    }
    response.status(201).json({ message: "Evento criado com sucesso" });
  });
};

export const getAgenda = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM eventos`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao listar clientes" });
      return;
    }
    response.status(200).json(data);
  });
};

export const putEditar = (request, response) => {
  const { evento_id, titulo, data, palestrante_id } = request.body;

  if (!evento_id) {
    response.status(400).json({ err: "O ID do objeto é obrigatório" });
    return;
  }
  if (!titulo) {
    response.status(400).json({ err: "O titulo do objeto é obrigatório" });
    return;
  }
  if (!data) {
    response.status(400).json({ err: "A data do objeto é obrigatória" });
    return;
  }
  if (!palestrante_id) {
    response.status(400).json({ err: "O Id do palestrante é obrigatório" });
    return;
  }

  const checkIdSql = /*sql*/ `SELECT * FROM eventos WHERE ?? = ?`;
  const checkIdData = ["evento_id", evento_id];
  conn.query(checkIdSql, checkIdData, (err, Data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao buscar evento" });
      return;
    }
    if (Data.length === 0) {
      response.status(404).json({ err: "Evento não encontrado" });
      return;
    }

    const updateSql = /*sql*/ `UPDATE eventos SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    const updateData = [
      "titulo",
      titulo,
      "data",
      data,
      "palestrante_id",
      palestrante_id,
      "evento_id",
      evento_id
    ];
    conn.query(updateSql, updateData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao atualizar evento" });
        return;
      }
      response.status(200).json({ message: "Evento atualizado" });
    });
  });
};

export const deleteCancelar = (request, response) => {
  const { evento_id } = request.body;

  const deleteSql = /*sql*/ `DELETE FROM eventos WHERE ?? = ?`;
  const deleteData = ["evento_id", evento_id];
  conn.query(deleteSql, deleteData, (err, info) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao deletar evento" });
      return;
    }

    if (info.affectedRows === 0) {
      response.status(404).json({ err: "Evento não encontrado" });
      return;
    }
    response.status(204).json({ message: "Evento deletado com sucesso" });
  });
};
