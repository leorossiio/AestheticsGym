const express = require("express");
const auth = require("../../middlewares/authentication"); // Middleware para rotas autenticadas
const TreinoModel = require("../../models/treinoModel"); // Modelo de dados do treino

const treinoController = express.Router(); // Router do Express para gerenciar rotas relacionadas a treinos

// Rota para criar um novo treino
treinoController.post("/cadastroTreino", auth, async (req, res) => {
  const { idUser, idUserCriador, nome, descricao } = req.body;

  try {
    // Cria um novo treino
    const treino = new TreinoModel({
      idUser: idUser,
      idUserCriador: idUserCriador,
      nome: nome, // Adiciona o campo nome
      descricao: descricao
    });

    await treino.save(); // Salva o treino no banco de dados
    return res.status(201).json({
      mensagem: "Treino criado com sucesso!",
      treino
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Rota para editar um treino
treinoController.put("/editarTreino/:idTreino", auth, async (req, res) => {
  const idTreino = req.params.idTreino; // Captura o ID do treino
  const { nome, descricao } = req.body; // Removeu o campo status e adicionou nome

  try {
    // Verifica se o treino existe com base no ID
    const treino = await TreinoModel.findOne({ idTreino: idTreino });
    if (!treino) {
      return res.status(404).json({ mensagem: "Treino não encontrado" });
    }

    // Atualiza os campos do treino
    if (nome) treino.nome = nome;
    if (descricao) treino.descricao = descricao;

    // Salva as alterações
    await treino.save();

    return res.status(200).json({ mensagem: "Treino atualizado com sucesso", treino });
  } catch (error) {
    console.error(`Um erro ocorreu ao editar o treino. ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

// Rota para deletar um treino
treinoController.delete("/deletarTreino/:idTreino", auth, async (req, res) => {
  const idTreino = req.params.idTreino; // Captura o ID do treino

  try {
    const treino = await TreinoModel.findOne({ idTreino: idTreino });
    // Se o treino não existir:
    if (!treino) {
      return res.status(404).json({ mensagem: "Treino não encontrado" });
    }
    // Se existir: Remove o treino
    await TreinoModel.findOneAndDelete({ idTreino: idTreino });
    // Retorna uma mensagem de sucesso
    return res.status(200).json({ mensagem: "Treino deletado com sucesso" });
  } catch (err) {
    console.error(`Um erro ocorreu ao deletar o treino. ${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Rota para listar todos os treinos
treinoController.get("/listarTreino", auth, async (req, res) => {
  try {
    const treinos = await TreinoModel.find();
    return res.status(200).json(treinos);
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar treinos. ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

// Rota para listar treinos por idUser
treinoController.get("/listarTreinoPorUsuario/:idUser", auth, async (req, res) => {
  const idUser = req.params.idUser; // Captura o ID do usuário

  try {
    const treinos = await TreinoModel.find({ idUser: idUser });
    return res.status(200).json(treinos);
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar treinos por usuário. ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = treinoController; // Exporta o router para ser utilizado na aplicação principal
