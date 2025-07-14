// Backend de la app de tareas creado por Miguel
// Aquí definimos las rutas de autenticación y tareas
// Dependencias principales
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const JWT_SECRET_KEY = "clave-ultra-secreta";
let tasks = [];

// Middleware para proteger las rutas con JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/auth/login", (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/tasks", authenticateToken, (req, res) => {
  res.json(tasks);
});

app.post("/tasks", authenticateToken, (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/tasks/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  tasks = tasks.map((t) => (t.id == id ? { ...t, completed } : t));
  res.sendStatus(200);
});

app.delete("/tasks/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id);
  res.sendStatus(200);
});

// Iniciamos el servidor
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));