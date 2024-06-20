const UserModel = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const loginController = async (req, res) => {
  const { email, senha } = req.body

  try {
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ mensagem: "Usuário não encontrado" })
    }

    const senhaValida = await bcryptjs.compare(senha, user.senha)
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" })
    }

    const token = jwt.sign(
      { idUser: user.idUser ,nome: user.nome, email: user.email, funcao: user.funcao },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    )

    return res.status(200).json({
      mensagem: "Usuário logado com sucesso!",
      token: token,
      funcao: user.funcao
    })
  } catch (error) {
    console.error("Erro ao processar login:", error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

module.exports = loginController
