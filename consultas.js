const axios = require("axios");

const baseUrl = "http://localhost:3000";

// Agregar un nuevo estudiante
axios
  .post(`${baseUrl}/nuevo`, {
    nombre: "Diego Baeza",
    rut: "17661091-1",
    curso: "Flauta",
    nivel: "Básico",
  })
  .then((response) => console.log(response.data));

// Consultar todos los estudiantes
axios.get(`${baseUrl}/consulta`).then((response) => console.log(response.data));

// Consultar estudiante por rut
axios
  .get(`${baseUrl}/rut/17661091-1`)
  .then((response) => console.log(response.data));

// Editar estudiante
axios
  .put(`${baseUrl}/editar`, {
    nombre: "Diego Baeza",
    rut: "17661091-1",
    curso: "Flauta",
    nivel: "Intermedio",
  })
  .then((response) => console.log(response.data));

// Eliminar estudiante
axios
  .delete(`${baseUrl}/eliminar/17661091-1`)
  .then((response) => console.log(response.data));
