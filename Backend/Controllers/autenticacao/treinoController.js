const express = require("express")
const auth = require("../../middlewares/authentication")
const TreinoModel = require("../../models/treinoModel")

const treinoController = express.Router()

// Rota para criar um novo treino
treinoController.post("/cadastroTreino", auth, async (req, res) => {
  const { idUser, idUserCriador, nome, descricao } = req.body

  try {
    const treino = new TreinoModel({
      idUser: idUser,
      idUserCriador: idUserCriador,
      nome: nome,
      descricao: descricao
    })

    await treino.save()
    return res.status(201).json({
      mensagem: "Treino criado com sucesso!",
      treino
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

// Rota para editar um treino
treinoController.put("/editarTreino/:idTreino", auth, async (req, res) => {
  const idTreino = req.params.idTreino
  const { nome, descricao } = req.body

  try {
    const treino = await TreinoModel.findOne({ idTreino: idTreino })
    if (!treino) {
      return res.status(404).json({ mensagem: "Treino não encontrado" })
    }

    if (nome) treino.nome = nome
    if (descricao) treino.descricao = descricao

    await treino.save()

    return res.status(200).json({ mensagem: "Treino atualizado com sucesso", treino })
  } catch (error) {
    console.error(`Um erro ocorreu ao editar o treino. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

// Rota para deletar um treino
treinoController.delete("/deletarTreino/:idTreino", auth, async (req, res) => {
  const idTreino = req.params.idTreino

  try {
    const treino = await TreinoModel.findOne({ idTreino: idTreino })
    if (!treino) {
      return res.status(404).json({ mensagem: "Treino não encontrado" })
    }
    await TreinoModel.findOneAndDelete({ idTreino: idTreino })

    return res.status(200).json({ mensagem: "Treino deletado com sucesso" })
  } catch (err) {
    console.error(`Um erro ocorreu ao deletar o treino. ${err}`)
    return res.status(500).json({ error: err.message })
  }
})

// Rota para listar todos os treinos
treinoController.get("/listarTreino", auth, async (req, res) => {
  try {
    const treinos = await TreinoModel.find()
    return res.status(200).json(treinos)
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar treinos. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

// Rota para listar treinos por idUser
treinoController.get("/listarTreinoPorUsuario/:idUser", auth, async (req, res) => {
  const idUser = req.params.idUser

  try {
    const treinos = await TreinoModel.find({ idUser: idUser })
    return res.status(200).json(treinos)
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar treinos por usuário. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

module.exports = treinoController
