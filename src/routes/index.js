// Esse arquivo é o ponto de entrada das rotas, e é ele que o resto do app vai acessar
import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

// Essa função centraliza as rotas
const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

  // .use inclui middlewares na instância do express
  // livros são as rotas que são exportadas de livrosRoutes.js
  app.use(express.json(), livros, autores);
};

export default routes;
