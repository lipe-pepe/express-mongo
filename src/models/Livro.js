import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, "O título é obrigatório."] },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória."],
      enum: {
        values: ["Classicos", "Aleph", "Intrinseca"],
        message: "A editora {VALUE} não é permitida",
      },
    },
    preco: { type: Number },
    paginas: {
      type: Number,
      // min: [
      //   10,
      //   "O número de páginas deve estar entre 10 e 5000. Número fornecido: {VALUE}",
      // ],
      // max: [
      //   5000,
      //   "O número de páginas deve estar entre 10 e 5000. Número fornecido: {VALUE}",
      // ],
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message:
          "O nº de páginas deve estar entre 10 e 5000. Valor recebido: {VALUE}",
      },
    },
    autor: autorSchema, // É assim que fazemos a relação com outro modelo no MongoDB
  },
  { versionKey: false } // É uma funcionalidade mais avançada que não será vista
);

// O primeiro param é a coleção que ele se refere, o segundo é o schema
const livro = mongoose.model("livros", livroSchema);

export default livro;
