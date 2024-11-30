import mongoose from "mongoose";

// Definimos propriedades para todos os campos do tipo String dos nossos modelos
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => {
    valor !== "";
  },
  message: ({ path }) => `O campo ${path} não pode ser vazio.`,
});
