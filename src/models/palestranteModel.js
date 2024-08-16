import conn from "../config/conn.js";

const tablePalestrantes = /*sql*/ `
    CREATE TABLE IF NOT EXISTS palestrantes(
        palestrante_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        expertise VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(tablePalestrantes, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [palestrantes] criada com sucesso");
});
