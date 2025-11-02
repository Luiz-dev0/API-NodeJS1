// ------------------------------
// IMPORTS
// ------------------------------
const express = require("express");
const cors = require("cors"); // permite requisições de outros domínios/origens

const app = express();

// ------------------------------
// MIDDLEWARES
// ------------------------------
app.use(cors());            // habilita CORS
app.use(express.json());    // permite receber JSON no body

// ------------------------------
// BANCO DE DADOS EM MEMÓRIA
// ------------------------------
let usuarios = [];
let id = 1;

// ------------------------------
// ROTA POST - Criar usuário
// ------------------------------
app.post("/usuarios", (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email || !telefone) {
    return res.status(400).json({ mensagem: "Campos obrigatórios não preenchidos." });
  }

  const user = {
    id: id++,
    nome,
    email,
    telefone,
    criadoEm: new Date(),
  };

  usuarios.push(user);

  res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: user,
    totalUsuarios: usuarios.length,
  });
});

// ------------------------------
// ROTA GET - Listar todos os usuários
// ------------------------------
app.get("/usuarios", (req, res) => {
  res.status(200).json({
    mensagem: "Lista de usuários",
    usuarios,
    totalUsuarios: usuarios.length,
  });
});

// ------------------------------
// ROTA GET - Buscar usuário por ID
// ------------------------------
app.get("/usuarios/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = usuarios.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ mensagem: "Usuário não encontrado!" });
  }

  res.status(200).json(user);
});

// ------------------------------
// ROTA PUT - Atualizar usuário por ID
// ------------------------------
app.put("/usuarios/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { nome, email, telefone } = req.body;
  const user = usuarios.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ mensagem: "Usuário não encontrado!" });
  }

  if (nome) user.nome = nome;
  if (email) user.email = email;
  if (telefone) user.telefone = telefone;

  res.status(200).json({
    mensagem: "Usuário atualizado com sucesso!",
    usuario: user,
  });
});

// ------------------------------
// ROTA DELETE - Excluir usuário por ID
// ------------------------------
app.delete("/usuarios/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado!" });
  }

  const removido = usuarios.splice(index, 1)[0];

  res.status(200).json({
    mensagem: "Usuário removido com sucesso!",
    usuarioRemovido: removido,
    totalUsuarios: usuarios.length,
  });
});

// ------------------------------
// INICIALIZA O SERVIDOR
// ------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
