const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const DietaSchema = new mongoose.Schema({
  idDieta: { type: String, default: uuidv4, unique: true, required: true },
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  calorias: { type: Number, required: true },
  diaDaSemana: {
    type: String,
    enum: ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'],
    required: true
  },
  horarioRefeicao: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.String, ref: 'User', required: true }
})

const DietaModel = mongoose.model("Dieta", DietaSchema)

module.exports = DietaModel
