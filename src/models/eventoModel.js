import conn from "../config/conn.js";

const tableEventos = /*sql*/ `
    CREATE TABLE IF NOT EXISTS eventos(
        evento_id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        data DATE NOT NULL,
        palestrante_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (palestrante_id) REFERENCES palestrantes(palestrante_id)
    )
`;

conn.query(tableEventos, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [eventos] criada com sucesso");
});
