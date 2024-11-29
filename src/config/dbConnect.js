import mongoose from "mongoose";

async function conectaNoDb() {
  // Ideal é não colocar a senha aqui direto
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default conectaNoDb;
