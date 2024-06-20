const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  idUser: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  funcao: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now }
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
