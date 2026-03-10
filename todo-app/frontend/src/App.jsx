import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addTodo(e) {
    e.preventDefault();

    if (!text || !number) return;

    try {
      await axios.post(API, {
        text,
        number: Number(number)
      });

      setText("");
      setNumber("");

      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  }

  async function getTodoById(id) {
    try {
      const res = await axios.get(`${API}/${id}`);
      setSelectedTodo(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteTodoById(id) {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Todo App</h1>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Task text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <button type="submit">Add Todo</button>

      </form>

      {/* Todo List */}
      <ul>

        {todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: "10px" }}>

            {todo.text} ({todo.number})

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => getTodoById(todo._id)}
            >
              View
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteTodoById(todo._id)}
            >
              Delete
            </button>

          </li>
        ))}

      </ul>

      {/* Selected Todo */}
      {selectedTodo && (
        <div style={{ marginTop: "30px" }}>

          <h2>Selected Todo</h2>

          <p><strong>Text:</strong> {selectedTodo.text}</p>
          <p><strong>Number:</strong> {selectedTodo.number}</p>

        </div>
      )}

    </div>
  );
};

export default App;