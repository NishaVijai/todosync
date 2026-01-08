import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Environment-aware API URL
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL;

export const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/todos`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = async (text) => {
    try {
      const res = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/api/todos/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const toggleTaskCompleted = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Error toggling completed:", err);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompleted,
        editTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
