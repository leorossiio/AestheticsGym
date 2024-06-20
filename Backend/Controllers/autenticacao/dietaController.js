const express = require("express")
const auth = require("../../middlewares/authentication")
const DietaModel = require("../../models/dietaModel")
const UserModel = require("../../models/User")

const dietaController = express.Router()

// Rota para criar uma nova dieta
dietaController.post("/cadastroDieta", auth, async (req, res) => {
  const { nome, descricao, calorias, diaDaSemana, horarioRefeicao, idUser } = req.body

  try {
    const user = await UserModel.findOne({ idUser: idUser })
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" })
    }

    const dieta = new DietaModel({
      nome: nome,
      descricao: descricao,
      calorias: calorias,
      diaDaSemana: diaDaSemana,
      horarioRefeicao: horarioRefeicao,
      idUser: idUser
    })

    await dieta.save()
    return res.status(201).json({
      mensagem: "Dieta criada com sucesso!",
      dieta
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

// Rota para editar uma dieta
dietaController.put("/editarDieta/:idDieta", auth, async (req, res) => {
  const idDieta = req.params.idDieta
  const { nome, descricao, calorias, diaDaSemana, horarioRefeicao } = req.body

  try {
    const dieta = await DietaModel.findOne({ idDieta: idDieta })
    if (!dieta) {
      return res.status(404).json({ mensagem: "Dieta não encontrada" })
    }

    if (nome) dieta.nome = nome
    if (descricao) dieta.descricao = descricao
    if (calorias) dieta.calorias = calorias
    if (diaDaSemana) dieta.diaDaSemana = diaDaSemana
    if (horarioRefeicao) dieta.horarioRefeicao = horarioRefeicao

    await dieta.save()

    return res.status(200).json({ mensagem: "Dieta atualizada com sucesso", dieta })
  } catch (error) {
    console.error(`Um erro ocorreu ao editar a dieta. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

// Rota para deletar uma dieta
dietaController.delete("/deletarDieta/:idDieta", auth, async (req, res) => {
  const idDieta = req.params.idDieta

  try {
    const dieta = await DietaModel.findOne({ idDieta: idDieta })

    if (!dieta) {
      return res.status(404).json({ mensagem: "Dieta não encontrada" })
    }
    await DietaModel.findOneAndDelete({ idDieta: idDieta })

    return res.status(200).json({ mensagem: "Dieta deletada com sucesso" })
  } catch (err) {
    console.error(`Um erro ocorreu ao deletar a dieta. ${err}`)
    return res.status(500).json({ error: err.message })
  }
})

// Rota para listar todas as dietas
dietaController.get("/listarDietas", auth, async (req, res) => {
  try {
    const dietas = await DietaModel.find()
    return res.status(200).json(dietas)
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar dietas. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

// Rota para listar dietas por idUser
dietaController.get("/listarDietasPorUsuario/:idUser", auth, async (req, res) => {
  const idUser = req.params.idUser

  try {
    const dietas = await DietaModel.find({ idUser: idUser })
    if (dietas.length === 0) {
      return res.status(404).json({ mensagem: "Nenhuma dieta encontrada para este usuário" })
    }
    return res.status(200).json(dietas)
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar dietas por usuário. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

module.exports = dietaController
