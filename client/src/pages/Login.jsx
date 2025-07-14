// Página de inicio de sesión hecha por Miguel
// Aquí validamos el usuario contra el backend local
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  // Estado local para los campos del formulario
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();

  // Esta función se encarga de enviar los datos del login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http:      userName,
      userPassword,
    });
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-xl mb-4">Login</h1>
        <input className="border p-2 w-full mb-2" type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} />
        <input className="border p-2 w-full mb-2" type="userPassword" placeholder="Password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;