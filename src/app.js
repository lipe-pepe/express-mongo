// O express vai gerenciar rotas e respostas
import express from "express";
import conectaNoDb from "./config/dbConnect.js";
import routes from "./routes/index.js";

import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

// Cria a conexão com o banco de dados
const conexao = await conectaNoDb();

// * OBS: As strings que são usadas nos eventos da conexão abaixo,
// * como 'error' e 'open', são configurações próprias da lib mongoose,
// * responsável por interfacear o MongoDB com a aplicação.

// Se receber um evento error na conexão, imprimimos no console
conexao.on("error", (erro) => {
  console.error("Erro de conexão: ", erro);
});

// Se receber um evento open na conexão, logamos no console
conexao.once("open", () => {
  console.log("Conexão com o banco realizada");
});

// ========================================================================================

const app = express();
routes(app); // inicia as rotas

// Middleware para o 404
app.use(manipulador404);

// Criamos um middleware de tratamento de erros. Tratamos o código aqui para não precisar ficar
// repetindo nas controllers.

app.use(manipuladorDeErros);

export default app;
