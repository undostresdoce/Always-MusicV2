const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

app.use(express.json());

const config = {
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "always_music",
};

const pool = new Pool(config);

app.post("/nuevo", async (req, res) => {
  const { nombre, rut, curso, nivel } = req.body;
  try {
    await pool.query(
      "INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)",
      [nombre, rut, curso, nivel]
    );
    res.send(`Estudiante ${nombre} agregado con éxito`);
  } catch (error) {
    console.error("Error al agregar nuevo estudiante:", error);
    res.status(500).send("Error al agregar nuevo estudiante");
  }
});

app.get("/consulta", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM estudiantes");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al consultar los estudiantes:", error);
    res.status(500).send("Error al consultar los estudiantes");
  }
});

app.get("/rut/:rut", async (req, res) => {
  const { rut } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM estudiantes WHERE rut = $1",
      [rut]
    );
    if (result.rows.length === 0) {
      res.send(`No se encontró estudiante con rut ${rut}`);
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error al consultar el estudiante por RUT:", error);
    res.status(500).send("Error al consultar el estudiante por RUT");
  }
});

app.put("/editar", async (req, res) => {
  const { nombre, rut, curso, nivel } = req.body;
  try {
    const result = await pool.query(
      "UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4",
      [nombre, curso, nivel, rut]
    );
    if (result.rowCount === 0) {
      res.send(`No se encontró estudiante con rut ${rut}`);
    } else {
      res.send(`Estudiante ${nombre} editado con éxito`);
    }
  } catch (error) {
    console.error("Error al editar el estudiante:", error);
    res.status(500).send("Error al editar el estudiante");
  }
});

app.delete("/eliminar/:rut", async (req, res) => {
  const { rut } = req.params;
  try {
    const result = await pool.query("DELETE FROM estudiantes WHERE rut = $1", [
      rut,
    ]);
    if (result.rowCount === 0) {
      res.send(`No se encontró estudiante con rut ${rut}`);
    } else {
      res.send(`Registro de estudiante con rut ${rut} eliminado`);
    }
  } catch (error) {
    console.error("Error al eliminar el estudiante:", error);
    res.status(500).send("Error al eliminar el estudiante");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

//node index.js nuevo "Diego Baeza" "17661091-1" "Flauta" "Básico"
//node index.js consulta
//node index.js rut "17661091-1"
//node index.js editar "Diego Baeza" "17661091-1" "Flauta" "Intermedio"
//node index.js eliminar "17661091-1"
