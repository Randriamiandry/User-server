const express = require("express");
const cors = require("cors");

// Comme Vercel ne permet pas de sauvegarde sur disque, on garde en mémoire
let users = [];

const app = express();
app.use(cors());
app.use(express.json());

// ➕ Ajouter un utilisateur
app.post("/api/users", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  if (!users.includes(userId)) {
    users.push(userId);
  }

  res.json({ success: true, users });
});

// 📋 Récupérer tous les utilisateurs
app.get("/api/users", (req, res) => {
  res.json({ users });
});

// ❌ Supprimer un utilisateur
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  users = users.filter(u => u !== userId);
  res.json({ success: true, users });
});

// Export pour Vercel
module.exports = app;
