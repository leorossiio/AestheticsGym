const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Biblioteca para gerar UUIDs

const ExercicioSchema = new mongoose.Schema({
  idExercicio: { type: String, default: uuidv4, unique: true, required: true },
  nome: { type: String, required: true },
  serie: { type: Number, required: true },
  repeticao: { type: Number, required: true },
  descricao: { type: String, required: true },
  idTreino: { type: mongoose.Schema.Types.String, ref: 'Treino', required: true }
});

const ExercicioModel = mongoose.model("Exercicio", ExercicioSchema);

module.exports = ExercicioModel;
