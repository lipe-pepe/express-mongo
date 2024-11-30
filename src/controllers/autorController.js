import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
  // Usamos o static para não precisar instanciar a classe
  static async listarAutores(req, res, next) {
    try {
      // Chamamos o modelo no MongoDB usando o mongoose. O .find é um método do mongoose
      const listaAutores = await autor.find({});
      // Usamos o .json para enviar dados estruturados
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Autor removido" });
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;
