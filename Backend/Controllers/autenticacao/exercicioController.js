const express = require("express");
const auth = require("../../middlewares/authentication"); // Middleware para rotas autenticadas
const ExercicioModel = require("../../models/exercicioModel"); // Modelo de dados do exercício
const TreinoModel = require("../../models/treinoModel"); // Modelo de dados do treino

const exercicioController = express.Router(); // Router do Express para gerenciar rotas relacionadas a exercícios

// Rota para criar um novo exercício
exercicioController.post("/cadastroExercicio", auth, async (req, res) => {
  const { nome, serie, repeticao, descricao, idTreino } = req.body;

  try {
    // Verifica se o treino existe
    const treino = await TreinoModel.findOne({ idTreino: idTreino });
    if (!treino) {
      return res.status(404).json({ mensagem: "Treino não encontrado" });
    }

    // Cria um novo exercício
    const exercicio = new ExercicioModel({
      nome: nome,
      serie: serie,
      repeticao: repeticao,
      descricao: descricao,
      idTreino: idTreino
    });

    await exercicio.save(); // Salva o exercício no banco de dados
    return res.status(201).json({
      mensagem: "Exercício criado com sucesso!",
      exercicio
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Rota para editar um exercício
exercicioController.put("/editarExercicio/:idExercicio", auth, async (req, res) => {
  const idExercicio = req.params.idExercicio; // Captura o ID do exercício
  const { nome, serie, repeticao, descricao } = req.body;

  try {
    // Verifica se o exercício existe com base no ID
    const exercicio = await ExercicioModel.findOne({ idExercicio: idExercicio });
    if (!exercicio) {
      return res.status(404).json({ mensagem: "Exercício não encontrado" });
    }

    // Atualiza os campos do exercício
    if (nome) exercicio.nome = nome;
    if (serie) exercicio.serie = serie;
    if (repeticao) exercicio.repeticao = repeticao;
    if (descricao) exercicio.descricao = descricao;

    // Salva as alterações
    await exercicio.save();

    return res.status(200).json({ mensagem: "Exercício atualizado com sucesso", exercicio });
  } catch (error) {
    console.error(`Um erro ocorreu ao editar o exercício. ${error}`);
    return res.status500().json({ error: error.message });
  }
});

// Rota para deletar um exercício
exercicioController.delete("/deletarExercicio/:idExercicio", auth, async (req, res) => {
  const idExercicio = req.params.idExercicio; // Captura o ID do exercício

  try {
    const exercicio = await ExercicioModel.findOne({ idExercicio: idExercicio });
    // Se o exercício não existir:
    if (!exercicio) {
      return res.status(404).json({ mensagem: "Exercício não encontrado" });
    }
    // Se existir: Remove o exercício
    await ExercicioModel.findOneAndDelete({ idExercicio: idExercicio });
    // Retorna uma mensagem de sucesso
    return res.status(200).json({ mensagem: "Exercício deletado com sucesso" });
  } catch (err) {
    console.error(`Um erro ocorreu ao deletar o exercício. ${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Rota para listar todos os exercícios
exercicioController.get("/listarExercicios", auth, async (req, res) => {
  try {
    const exercicios = await ExercicioModel.find();
    return res.status(200).json(exercicios);
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar exercícios. ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = exercicioController; // Exporta o router para ser utilizado na aplicação principal
