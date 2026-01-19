import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Environment-aware API URL
// const API_URL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5000"
//     : import.meta.env.VITE_API_URL;

const API_URL = import.meta.env.VITE_API_URL;

export const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch tasks safely on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/todos`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Unexpected data from backend:", data);
          setTasks([]);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      }
      finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (text) => {
    try {
      const res = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`Failed to add task: ${res.status}`);
      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete task: ${res.status}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle completed
  const toggleTaskCompleted = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (!task) return;
      const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error(`Failed to toggle task: ${res.status}`);
      const updatedTask = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  // Edit task
  const editTask = async (id, newText) => {
    try {
      const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      if (!res.ok) throw new Error(`Failed to edit task: ${res.status}`);
      const updatedTask = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
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

// PropTypes validation
TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
