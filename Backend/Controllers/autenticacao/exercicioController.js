const express = require("express")
const auth = require("../../middlewares/authentication")
const ExercicioModel = require("../../models/exercicioModel")
const TreinoModel = require("../../models/treinoModel")

const exercicioController = express.Router()

// Rota para criar um novo exercício
exercicioController.post("/cadastroExercicio", auth, async (req, res) => {
  const { nome, serie, repeticao, descricao, idTreino } = req.body

  try {
    const treino = await TreinoModel.findOne({ idTreino: idTreino })
    if (!treino) {
      return res.status(404).json({ mensagem: "Treino não encontrado" })
    }

    const exercicio = new ExercicioModel({
      nome: nome,
      serie: serie,
      repeticao: repeticao,
      descricao: descricao,
      idTreino: idTreino
    })

    await exercicio.save()
    return res.status(201).json({
      mensagem: "Exercício criado com sucesso!",
      exercicio
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

// Rota para editar um exercício
exercicioController.put("/editarExercicio/:idExercicio", auth, async (req, res) => {
  const idExercicio = req.params.idExercicio
  const { nome, serie, repeticao, descricao } = req.body

  try {
    const exercicio = await ExercicioModel.findOne({ idExercicio: idExercicio })
    if (!exercicio) {
      return res.status(404).json({ mensagem: "Exercício não encontrado" })
    }

    if (nome) exercicio.nome = nome
    if (serie) exercicio.serie = serie
    if (repeticao) exercicio.repeticao = repeticao
    if (descricao) exercicio.descricao = descricao

    await exercicio.save()

    return res.status(200).json({ mensagem: "Exercício atualizado com sucesso", exercicio })
  } catch (error) {
    console.error(`Um erro ocorreu ao editar o exercício. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

// Rota para deletar um exercício
exercicioController.delete("/deletarExercicio/:idExercicio", auth, async (req, res) => {
  const idExercicio = req.params.idExercicio

  try {
    const exercicio = await ExercicioModel.findOne({ idExercicio: idExercicio })
    if (!exercicio) {
      return res.status(404).json({ mensagem: "Exercício não encontrado" })
    }
    await ExercicioModel.findOneAndDelete({ idExercicio: idExercicio })

    return res.status(200).json({ mensagem: "Exercício deletado com sucesso" })
  } catch (err) {
    console.error(`Um erro ocorreu ao deletar o exercício. ${err}`)
    return res.status(500).json({ error: err.message })
  }
})

// Rota para listar todos os exercícios
exercicioController.get("/listarExercicios", auth, async (req, res) => {
  try {
    const exercicios = await ExercicioModel.find()
    return res.status(200).json(exercicios)
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar exercícios. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

// Rota para listar exercícios por idTreino
exercicioController.get("/listarExerciciosPorTreino/:idTreino", auth, async (req, res) => {
  const idTreino = req.params.idTreino

  try {
    const exercicios = await ExercicioModel.find({ idTreino: idTreino })
    if (exercicios.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum exercício encontrado para este treino" })
    }
    return res.status(200).json(exercicios)
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar exercícios por treino. ${error}`)
    return res.status(500).json({ error: error.message })
  }
})

module.exports = exercicioController
