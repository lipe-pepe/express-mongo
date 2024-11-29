import { autor } from "../models/Autor.js";

class AutorController {
  // Usamos o static para não precisar instanciar a classe
  static async listarAutores(req, res) {
    try {
      // Chamamos o modelo no MongoDB usando o mongoose. O .find é um método do mongoose
      const listaAutores = await autor.find({});
      // Usamos o .json para enviar dados estruturados
      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao listar autores`,
      });
    }
  }

  static async listarAutor(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      res.status(200).json(autorEncontrado);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao buscar autor`,
      });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao cadastrar autor`,
      });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao atualizar autor`,
      });
    }
  }

  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Autor removido" });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao remover autor`,
      });
    }
  }
}

export default AutorController;
