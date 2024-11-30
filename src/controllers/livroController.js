import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor } from "../models/Autor.js";
import { livro } from "../models/index.js";

class LivroController {
  // Usamos o static para não precisar instanciar a classe
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next(); // Executa o proximo middleware registrado na rota
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

  static async buscarPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livrosResultado = livro.find(busca);
        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).json([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  // Pega o query param "editora"
  const { titulo, editora, minPaginas, maxPaginas } = parametros;

  let busca = {};
  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.paginas = {};

  // gte -> greater than or equal / lte -> less than or equal
  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  return busca;
}

export default LivroController;
