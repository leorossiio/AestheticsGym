const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Biblioteca para gerar UUIDs

const TreinoSchema = new mongoose.Schema({
  idTreino: { type: String, default: uuidv4, unique: true, required: true },
  idUser: { type: String, required: true },
  idUserCriador: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Não iniciado', 'Em andamento', 'Finalizado'],
    default: 'Não iniciado'
  }
});

const TreinoModel = mongoose.model("Treino", TreinoSchema);

module.exports = TreinoModel;
