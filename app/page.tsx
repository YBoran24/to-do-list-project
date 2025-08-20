// next-app-template/app/page.tsx
"use client";
import { useState, useEffect } from "react";


interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  priority: "Düşük" | "Orta" | "Yüksek";
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending" | "Düşük" | "Orta" | "Yüksek">("All");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const today = new Date();
    const dateString = today.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const task: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      date: dateString,
      priority: "Orta",
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newText = prompt("Görevi düzenle:", task.text);
    if (newText !== null && newText.trim() !== "") {
      setTasks(tasks.map(t => t.id === id ? { ...t, text: newText.trim() } : t));
    }
  };

  const changePriority = (id: number, priority: "Düşük" | "Orta" | "Yüksek") => {
    setTasks(tasks.map(t => t.id === id ? { ...t, priority } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "All") return true;
    if (filter === "Completed") return t.completed;
    if (filter === "Pending") return !t.completed;
    if (filter === "Düşük") return t.priority === "Düşük";
    if (filter === "Orta") return t.priority === "Orta";
    if (filter === "Yüksek") return t.priority === "Yüksek";
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;

  const getPriorityColor = (priority: "Düşük" | "Orta" | "Yüksek") => {
    switch(priority) {
      case "Düşük": return "bg-green-400";
      case "Orta": return "bg-yellow-400";
      case "Yüksek": return "bg-red-400";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-3xl font-bold text-white mb-4">Profesyonel To-Do List</h1>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-white bg-opacity-30 rounded-full h-4 mb-4 overflow-hidden">
        <div className="bg-green-500 h-4 transition-all duration-500" style={{width: `${progress}%`}} />
      </div>

      {/* Görev Ekleme */}
      <div className="flex mb-4 w-full max-w-md">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Yeni görev ekle..."
          className="flex-1 px-4 py-2 rounded-l-md outline-none border-none w-full text-black placeholder-gray-500 bg-white"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-r-md hover:bg-purple-600 transition"
        >
          Ekle
        </button>
      </div>

      {/* Filtreleme */}
      <div className="flex space-x-2 mb-4 flex-wrap justify-center">
        {(["All", "Completed", "Pending", "Düşük", "Orta", "Yüksek"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md font-semibold transition ${
              f === "All" 
                ? `bg-purple-400 text-white hover:bg-purple-500 ${filter === f ? "bg-purple-600" : ""}`
                : f === "Completed"
                  ? `bg-blue-400 text-white hover:bg-blue-500 ${filter === f ? "bg-blue-600" : ""}`
                  : f === "Pending"
                    ? `bg-yellow-400 text-white hover:bg-yellow-500 ${filter === f ? "bg-yellow-600" : ""}`
                    : f === "Düşük"
                      ? `bg-green-400 text-black hover:bg-green-500 ${filter === f ? "bg-green-600" : ""}`
                      : f === "Orta"
                        ? `bg-yellow-400 text-black hover:bg-yellow-500 ${filter === f ? "bg-yellow-600" : ""}`
                        : `bg-red-400 text-black hover:bg-red-500 ${filter === f ? "bg-red-600" : ""}`
            }`}
          >
            {f === "All" ? "Tümü" : f === "Completed" ? "Yapıldı" : f === "Pending" ? "Yapılacak" : f}
          </button>
        ))}
      </div>

      {/* Görevler Listesi */}
      <ul className="w-full max-w-md">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex items-center justify-between bg-white bg-opacity-40 mb-3 px-4 py-2 rounded-md shadow-sm transition-all duration-300">
            <div className="flex items-center flex-1">
              {/* Checkbox */}
              <div
                className={`w-6 h-6 border-2 border-black rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  task.completed ? "bg-white" : "bg-transparent"
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed && (
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Görev metni */}
              <div className="ml-4 flex-1">
                <span
                  onDoubleClick={() => editTask(task.id)}
                  className={`font-medium transition-all duration-300 cursor-pointer text-black ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
                <div className="text-xs text-gray-700 mt-1 flex items-center justify-between">
                  <span>Eklenme: {task.date}</span>
                  <select
                    value={task.priority}
                    onChange={(e) => changePriority(task.id, e.target.value as "Düşük" | "Orta" | "Yüksek")}
                    className={`ml-2 px-1 py-0.5 rounded ${getPriorityColor(task.priority)} text-black text-xs`}
                  >
                    <option value="Düşük">Düşük</option>
                    <option value="Orta">Orta</option>
                    <option value="Yüksek">Yüksek</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Silme butonu */}
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-2 text-red-500 font-bold hover:text-red-700 transition"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
