import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  // Usamos o static para não precisar instanciar a classe
  static async listarLivros(req, res) {
    try {
      // Chamamos o modelo no MongoDB usando o mongoose. O .find é um método do mongoose
      const listaLivros = await livro.find({});
      // Usamos o .json para enviar dados estruturados
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao listar livros`,
      });
    }
  }

  static async listarLivro(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao buscar livro`,
      });
    }
  }

  static async cadastrarLivro(req, res) {
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
      res.status(500).json({
        message: `${erro.message} - Falha ao cadastrar livro`,
      });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao atualizar livro`,
      });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Livro removido" });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao remover livro`,
      });
    }
  }

  static async buscarPorEditora(req, res) {
    // Pega o query param "editora"
    const editora = req.query.editora;
    try {
      // Busca o livro pela propriedade editora usando o valor passado na query param
      const resultado = await livro.find({ editora: editora });
      res.status(200).json(resultado);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao buscar livro`,
      });
    }
  }
}

export default LivroController;
