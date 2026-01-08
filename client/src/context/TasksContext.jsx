import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add a new task
  const addTask = async (text) => {
    try {
      const res = await fetch("http://localhost:5000/api/todos", {
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

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle completed (update backend)
  const toggleTaskCompleted = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
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

  // Edit task (update backend)
  const editTask = async (id, newText) => {
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
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

// PropTypes validation
TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
