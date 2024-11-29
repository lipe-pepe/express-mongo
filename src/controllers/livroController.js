import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  // Usamos o static para não precisar instanciar a classe
  static async listarLivros(req, res, next) {
    try {
      // Chamamos o modelo no MongoDB usando o mongoose. O .find é um método do mongoose
      const listaLivros = await livro.find({});
      // Usamos o .json para enviar dados estruturados
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      // Temos que "desmembrar" o autor porque ele vem num formato específico do Mongo, então estamos usando o operador de espalhamento
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "Criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;

      const livroResultado = await livro.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async buscarPorEditora(req, res, next) {
    // Pega o query param "editora"
    const editora = req.query.editora;
    try {
      // Busca o livro pela propriedade editora usando o valor passado na query param
      const resultado = await livro.find({ editora: editora });
      res.status(200).json(resultado);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
