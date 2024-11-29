import mongoose from "mongoose";

async function conectaNoDb() {
  // Ideal é não colocar a senha aqui direto
  // eslint-disable-next-line no-undef
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default conectaNoDb;
