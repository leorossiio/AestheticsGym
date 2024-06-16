const bcryptjs = require("bcryptjs") // Biblioteca para criptografar senhas
const express = require("express") // Framework para construir a aplicação web
const auth = require("../../middlewares/authentication") // Middleware para rotas autenticadas
const UserModel = require("../../models/User") // Modelo de dados do usuário
const { v4: uuidv4 } = require("uuid") // Biblioteca para gerar UUIDs
const crypto = require("crypto") // Biblioteca para criar hashes

const userController = express.Router() // Router do Express para gerenciar rotas relacionadas a usuários

const dataAtual = new Date() // Captura a data e hora atual

// Ajusta a data e hora para o fuso horário do Brasil (UTC-3)
const offsetBrasil = -3
const dataAtualBrasil = new Date(dataAtual.getTime() - offsetBrasil * 60 * 60 * 1000)

// Função para gerar um ID único de 24 caracteres
function generateId() {
  const uuid = uuidv4()
  const hash = crypto.createHash('sha256').update(uuid).digest('hex')
  return hash.slice(0, 24)
}

// Mapeamento de funções para códigos numéricos
const funcoes = {
  1: "ALUNO",
  2: "PROFESSOR"
}

// Rotas não autenticadas:

// Rota para criar um novo usuário/cliente sem autenticação
userController.post("/cadastroUsuarioNaoAutenticada", async (req, res) => {
  const { nome, email, senha, confirmacaoSenha } = req.body

  try {
    if (senha !== confirmacaoSenha) {
      return res.status(400).json({
        mensagem: "Senha e confirmação de senha não coincidem!",
      })
    }

    // Gera um ID único de 24 caracteres
    let idUser = generateId()

    // Verifica se o nome de usuário ou email já existe
    const usuarioExistente = await UserModel.findOne({
      $or: [{ nome: nome }, { email: email }],
    })
    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: "Nome de usuário ou email já existe!",
      })
    }

    // Criptografa a senha
    const senhaEncrypt = await bcryptjs.hash(senha, 10)
    const funcaoNome = "ALUNO" // Fixo como "Aluno" para cadastro não autenticado

    // Cria um novo usuário
    const user = {
      idUser: idUser,
      nome: nome,
      email: email,
      senha: senhaEncrypt,
      funcao: funcaoNome,
      dataCriacao: dataAtualBrasil // Adicionando a data de criação
    }

    await UserModel.create(user) // Salva o usuário no banco de dados
    return res.status(201).json({
      mensagem: "Usuário criado com sucesso!",
    })
  } catch (error) {
    return res.status(500).json({
      error: error,
    })
  }
})

// Rotas autenticadas:

// Rota para obter todos os usuários
userController.get("/listarUsuarios", auth, async (req, res) => {
  try {
      let usuarios = await UserModel.find()
      return res.status(200).json(usuarios)
  } catch (err) {
      console.log(`Erro ao buscar usuários. ${err}`)
      return res.status(500).json({ error: err })
  }
})

// Rota para obter usuários agrupados por função
userController.get("/usuariosPorFuncao", auth, async (req, res) => {
  try {
    const usuariosPorFuncao = await UserModel.aggregate([
      {
        $group: {
          _id: "$funcao",
          total: { $sum: 1 }, // Total de usuários por função
        },
      },
    ])

    const totalUsuarios = await UserModel.countDocuments()

    return res.status(200).json({ usuariosPorFuncao, totalUsuarios })
  } catch (error) {
    console.log(`Erro ao buscar usuários por função. ${error}`)
    return res.status(500).json({ error: error })
  }
})

// Rota para obter um usuário específico pelo email
userController.get("/:email", auth, async (req, res) => {
  const email = req.params.email

  try {
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado /:email" })
    }

    return res.status(200).json(user)
  } catch (err) {
    console.log(`Um erro ocorreu ao buscar usuários. ${err}`)
    return res.status(500).json({ error: err })
  }
})

// Rota para deletar um usuário específico pelo ID
userController.delete("/:idUser", auth, async (req, res) => {
  const idUser = req.params.idUser // Captura o idUser
  try {
    const user = await UserModel.findOne({ idUser: idUser })
    // Se o usuário não existir:
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" })
    }
    // Se existir: Remove o usuário
    await UserModel.findOneAndDelete({ idUser: idUser })
    // Retorna uma mensagem de sucesso
    return res.status(200).json({ mensagem: "Usuário deletado com sucesso" })
  } catch (err) {
    console.error(`Um erro ocorreu ao deletar o usuário. ${err}`)
    return res.status(500).json({ error: err })
  }
})

// Rota autenticada para cadastro de usuários
userController.post("/cadastroUsuarioAutenticada", auth, async (req, res) => {
  const { nome, email, senha, confirmacaoSenha, funcao } = req.body

  try {
    if (senha !== confirmacaoSenha) {
      return res.status(400).json({
        mensagem: "Senha e confirmação de senha não coincidem!",
      })
    }

    if (!["ALUNO", "PROFESSOR"].includes(funcao)) {
      return res.status(400).json({
        mensagem: "Função inválida! Deve ser 'ALUNO' ou 'PROFESSOR'.",
      })
    }

    // Gera um ID único de 24 caracteres
    let idUser = generateId()

    // Verifica se o nome de usuário ou email já existe
    const usuarioExistente = await UserModel.findOne({
      $or: [{ nome: nome }, { email: email }],
    })
    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: "Nome de usuário ou email já existe!",
      })
    }

    // Criptografa a senha
    const senhaEncrypt = await bcryptjs.hash(senha, 10)
    const funcaoNome = funcao // "ALUNO" ou "PROFESSOR" conforme fornecido

    // Cria um novo usuário
    const user = {
      idUser: idUser,
      nome: nome,
      email: email,
      senha: senhaEncrypt,
      funcao: funcaoNome,
      dataCriacao: dataAtualBrasil // Adicionando a data de criação
    }

    await UserModel.create(user) // Salva o usuário no banco de dados
    return res.status(201).json({
      mensagem: "Usuário criado com sucesso!",
    })
  } catch (error) {
    return res.status(500).json({
      error: error,
    })
  }
})

// Rota para editar usuário:
userController.put("/editarUsuario/:idUser", auth, async (req, res) => {
  const idUser = req.params.idUser // Captura o ID do usuário
  const { nome, email, funcao } = req.body

  try {
    // Verifica se o usuário existe com base no ID
    const user = await UserModel.findOne({ idUser: idUser })
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" })
    }

    // Atualiza os campos do usuário
    if (nome) user.nome = nome
    if (email) user.email = email
    if (funcao) {
      if (!["ALUNO", "PROFESSOR"].includes(funcao)) {
        return res.status(400).json({
          mensagem: "Função inválida! Deve ser 'ALUNO' ou 'PROFESSOR'.",
        })
      }
      user.funcao = funcao
    }

    // Salva as alterações
    await user.save()

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" })
  } catch (error) {
    console.error(`Um erro ocorreu ao editar o usuário. ${error}`)
    return res.status(500).json({ error: error })
  }
})

module.exports = userController // Exporta o router para ser utilizado na aplicação principal
