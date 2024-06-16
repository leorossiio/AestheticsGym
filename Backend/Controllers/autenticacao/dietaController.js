const express = require("express");
const auth = require("../../middlewares/authentication"); // Middleware para rotas autenticadas
const DietaModel = require("../../models/dietaModel"); // Modelo de dados da dieta
const UserModel = require("../../models/User"); // Modelo de dados do usuário

const dietaController = express.Router(); // Router do Express para gerenciar rotas relacionadas a dietas

// Rota para criar uma nova dieta
dietaController.post("/cadastroDieta", auth, async (req, res) => {
  const { nome, descricao, calorias, diaDaSemana, horarioRefeicao, idUser } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await UserModel.findOne({ idUser: idUser });
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Cria uma nova dieta
    const dieta = new DietaModel({
      nome: nome,
      descricao: descricao,
      calorias: calorias,
      diaDaSemana: diaDaSemana,
      horarioRefeicao: horarioRefeicao,
      idUser: idUser
    });

    await dieta.save(); // Salva a dieta no banco de dados
    return res.status(201).json({
      mensagem: "Dieta criada com sucesso!",
      dieta
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Rota para editar uma dieta
dietaController.put("/editarDieta/:idDieta", auth, async (req, res) => {
  const idDieta = req.params.idDieta; // Captura o ID da dieta
  const { nome, descricao, calorias, diaDaSemana, horarioRefeicao } = req.body;

  try {
    // Verifica se a dieta existe com base no ID
    const dieta = await DietaModel.findOne({ idDieta: idDieta });
    if (!dieta) {
      return res.status(404).json({ mensagem: "Dieta não encontrada" });
    }

    // Atualiza os campos da dieta
    if (nome) dieta.nome = nome;
    if (descricao) dieta.descricao = descricao;
    if (calorias) dieta.calorias = calorias;
    if (diaDaSemana) dieta.diaDaSemana = diaDaSemana;
    if (horarioRefeicao) dieta.horarioRefeicao = horarioRefeicao;

    // Salva as alterações
    await dieta.save();

    return res.status(200).json({ mensagem: "Dieta atualizada com sucesso", dieta });
  } catch (error) {
    console.error(`Um erro ocorreu ao editar a dieta. ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

// Rota para deletar uma dieta
dietaController.delete("/deletarDieta/:idDieta", auth, async (req, res) => {
  const idDieta = req.params.idDieta; // Captura o ID da dieta

  try {
    const dieta = await DietaModel.findOne({ idDieta: idDieta });
    // Se a dieta não existir:
    if (!dieta) {
      return res.status(404).json({ mensagem: "Dieta não encontrada" });
    }
    // Se existir: Remove a dieta
    await DietaModel.findOneAndDelete({ idDieta: idDieta });
    // Retorna uma mensagem de sucesso
    return res.status(200).json({ mensagem: "Dieta deletada com sucesso" });
  } catch (err) {
    console.error(`Um erro ocorreu ao deletar a dieta. ${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Rota para listar todas as dietas
dietaController.get("/listarDietas", auth, async (req, res) => {
  try {
    const dietas = await DietaModel.find();
    return res.status(200).json(dietas);
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar dietas. ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

// Rota para listar dietas por idUser
dietaController.get("/listarDietasPorUsuario/:idUser", auth, async (req, res) => {
  const idUser = req.params.idUser; // Captura o ID do usuário

  try {
    const dietas = await DietaModel.find({ idUser: idUser });
    if (dietas.length === 0) {
      return res.status(404).json({ mensagem: "Nenhuma dieta encontrada para este usuário" });
    }
    return res.status(200).json(dietas);
  } catch (error) {
    console.error(`Um erro ocorreu ao buscar dietas por usuário. ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = dietaController; // Exporta o router para ser utilizado na aplicação principal
