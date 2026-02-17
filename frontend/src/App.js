import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch todos
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add or Update todo
  const addTodo = () => {
    if (!task) return;

    // EDIT
    if (editId) {
      fetch(`http://localhost:5000/api/todos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task, completed: false })
      }).then(() => {
        setTodos(
          todos.map(t =>
            t.id === editId ? { ...t, title: task } : t
          )
        );
        setEditId(null);
        setTask("");
      });
    }
    // ADD
    else {
      fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task })
      })
        .then(res => res.json())
        .then(newTodo => {
          setTodos([...todos, newTodo]);
          setTask("");
        });
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTodos(todos.filter(t => t.id !== id));
    });
  };

  // Toggle complete
  const toggleComplete = (todo) => {
    fetch(`http://localhost:5000/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed
      })
    }).then(() => {
      setTodos(
        todos.map(t =>
          t.id === todo.id
            ? { ...t, completed: !t.completed }
            : t
        )
      );
    });
  };

  return (
    <div className="app">
      <h1>✨ My Todo App</h1>

      <div className="input-box">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
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
            <span onClick={() => toggleComplete(todo)}>
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
