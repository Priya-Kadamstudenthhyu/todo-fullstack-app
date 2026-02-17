import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task) return;

    if (editId) {
      setTodos(
        todos.map(t =>
          t.id === editId ? { ...t, title: task } : t
        )
      );
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        { id: Date.now(), title: task, completed: false }
      ]);
    }
    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="app">
      <h1>✨ Todo App</h1>

      <div className="input-box">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTodo}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? "done" : ""}
          >
            <span onClick={() => toggleComplete(todo.id)}>
              {todo.title}
            </span>

            <div className="actions">
              <button
                className="edit"
                onClick={() => {
                  setTask(todo.title);
                  setEditId(todo.id);
                }}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
