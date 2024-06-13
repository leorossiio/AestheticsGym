const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token é obrigatório!" });
    }

    const [, token] = authHeader.split(' ');

    try {
        const senha = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, senha);
        req.user = decoded; // Adiciona as informações do usuário ao objeto de solicitação
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido!" });
    }
};

module.exports = auth;
