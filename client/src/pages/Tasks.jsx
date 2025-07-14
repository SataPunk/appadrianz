import React, { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const { data } = await axios.get("http://localhost:4000/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:4000/tasks", { title: newTask }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewTask("");
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`http://localhost:4000/tasks/${id}`, { completed: !completed }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Mis Tareas</h1>
      <div className="mb-4 flex">
        <input className="border p-2 flex-1" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Nueva tarea" />
        <button onClick={addTask} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">Agregar</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            <span onClick={() => toggleTask(task.id, task.completed)} className={task.completed ? "line-through cursor-pointer" : "cursor-pointer"}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;