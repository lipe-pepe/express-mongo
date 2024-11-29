import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

// O erro de validação herda de RequisicaoIncorreta pois eles usam o mesmo status, assim facilitamos.
class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    // .values é um método do próprio JS para iterar sobre objetos
    const mensagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
    super(`Erros encontrados: ${mensagensErro}`);
  }
}

export default ErroValidacao;
