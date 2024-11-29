import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

// Cria uma rota de get para autores
routes.get("/autores", AutorController.listarAutores);
routes.get("/autores/:id", AutorController.listarAutor);
routes.post("/autores", AutorController.cadastrarAutor);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.excluirAutor);

export default routes;
