import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

import loginController from "./Controllers/loginController.js";
import userController from "./Controllers/autenticacao/userController.js";
import treinoController from "./Controllers/autenticacao/treinoController.js";

const servidor = express();


servidor.use(express.json());

// Configurações do CORS
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200
};

servidor.use(cors(corsOptions));


servidor.use("/login", loginController);
servidor.use("/users", userController);
servidor.use("/treino", treinoController);

// Conexão com o banco de dados MongoDB
const PORT = process.env.PORT || 3000;  // Porta padrão caso não esteja definida no .env
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@crud-app.yso2wfp.mongodb.net/${DB_NAME}`;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Banco de dados conectado com sucesso");
    servidor.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Erro ao conectar no banco de dados. ${error}`);
  });
