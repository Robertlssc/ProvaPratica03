import conn from "../config/conn.js";

const tableInscricoes = /*sql*/ `
    CREATE TABLE IF NOT EXISTS inscricoes(
        inscricao_id INT AUTO_INCREMENT PRIMARY KEY,
        participante_id INT,
        evento_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (participante_id) REFERENCES participantes(participante_id),
        FOREIGN KEY (evento_id) REFERENCES eventos(evento_id)
    )
`;

conn.query(tableInscricoes, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [inscricoes] criada com sucesso");
});
