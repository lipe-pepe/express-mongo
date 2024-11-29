import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, "O título é obrigatório."] },
    editora: { type: String, required: [true, "A editora é obrigatória."] },
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema, // É assim que fazemos a relação com outro modelo no MongoDB
  },
  { versionKey: false } // É uma funcionalidade mais avançada que não será vista
);

// O primeiro param é a coleção que ele se refere, o segundo é o schema
const livro = mongoose.model("livros", livroSchema);

export default livro;
