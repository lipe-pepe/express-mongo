import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    // Paginação da Busca
    let {
      limite = 5,
      pagina = 1,
      campoOrdenacao = "_id",
      ordem = -1, // -1 -> Ordem decrescente / 1 -> Ordem crescente
    } = req.query;

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {
      // Chamamos o modelo no MongoDB usando o mongoose. O .find é um método do mongoose
      const resultadoPaginado = await resultado
        .find()
        .sort({ [campoOrdenacao]: ordem }) // -1 -> Ordem decrescente / 1 -> Ordem crescente
        .skip((pagina - 1) * 5)
        .limit(limite)
        .populate("autor")
        .exec();
      // Usamos o .json para enviar dados estruturados
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (erro) {
    next(erro);
  }
}

export default paginar;
