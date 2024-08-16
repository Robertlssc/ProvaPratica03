import conn from "../config/conn.js";

const tableFeedback = /*sql*/ `
    CREATE TABLE IF NOT EXISTS feedbacks(
        feedback_id INT AUTO_INCREMENT PRIMARY KEY,
        participante_id INT,
        evento_id INT,
        nota INT NOT NULL,
        comentario VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (participante_id) REFERENCES participantes(participante_id),
        FOREIGN KEY (evento_id) REFERENCES eventos(evento_id)
    )
`;

conn.query(tableFeedback, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [feedbacks] criada com sucesso");
});
