// Enrutador principal de la app de tareas
// Si el usuario no tiene token, lo mandamos al login
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

function App() {
  // Verificamos si el usuario ya tiene sesión
  const authToken = localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={authToken ? <Tasks /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;