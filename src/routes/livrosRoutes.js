import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

// * OBS: O express trabalha com uma precedência de rotas, ou seja, elas são chamadas na sequência que elas são declaradas.
// * No exemplo abaixo, se livros/:id aparece antes de livros/busca, o express vai parar na rota de id. Por isso colocamos as
// * rotas da maior para a menor complexidade.

// Cria uma rota de get para livros
routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/busca", LivroController.buscarPorEditora);
routes.get("/livros/:id", LivroController.listarLivro);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.excluirLivro);

export default routes;
