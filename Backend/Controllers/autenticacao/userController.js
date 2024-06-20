const bcryptjs = require("bcryptjs")
const express = require("express")
const auth = require("../../middlewares/authentication")
const UserModel = require("../../models/User")
const { v4: uuidv4 } = require("uuid")
const crypto = require("crypto")

const userController = express.Router()

const dataAtual = new Date()

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

    let idUser = generateId()

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
    const funcaoNome = "ALUNO"

    const user = {
      idUser: idUser,
      nome: nome,
      email: email,
      senha: senhaEncrypt,
      funcao: funcaoNome,
      dataCriacao: dataAtualBrasil
    }

    await UserModel.create(user)
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
          total: { $sum: 1 },
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
  const idUser = req.params.idUser
  try {
    const user = await UserModel.findOne({ idUser: idUser })

    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" })
    }
    await UserModel.findOneAndDelete({ idUser: idUser })

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

    let idUser = generateId()

    const usuarioExistente = await UserModel.findOne({
      $or: [{ nome: nome }, { email: email }],
    })
    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: "Nome de usuário ou email já existe!",
      })
    }

    const senhaEncrypt = await bcryptjs.hash(senha, 10)
    const funcaoNome = funcao

    const user = {
      idUser: idUser,
      nome: nome,
      email: email,
      senha: senhaEncrypt,
      funcao: funcaoNome,
      dataCriacao: dataAtualBrasil
    }

    await UserModel.create(user)
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
  const idUser = req.params.idUser
  const { nome, email, funcao } = req.body

  try {
    const user = await UserModel.findOne({ idUser: idUser })
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" })
    }

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

    await user.save()

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" })
  } catch (error) {
    console.error(`Um erro ocorreu ao editar o usuário. ${error}`)
    return res.status(500).json({ error: error })
  }
})

module.exports = userController
