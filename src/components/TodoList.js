import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  // Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios.get('http://localhost:5005/todos');
      setTodos(result.data);
    };
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (text && date) {
      const newTodo = { text, date };
      const result = await axios.post('http://localhost:5005/add', newTodo);
      setTodos([...todos, result.data]);
      setText('');
      setDate('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text} - {new Date(todo.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
