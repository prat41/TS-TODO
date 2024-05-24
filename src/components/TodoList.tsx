import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Array<{ _id: string; title: string; completed: boolean }>>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  const handleCreateTodo = async () => {
    const { data } = await createTodo(newTodo);
    setTodos([...todos, data]);
    setNewTodo('');
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    const { data } = await updateTodo(id, completed);
    setTodos(todos.map(todo => (todo._id === id ? data : todo)));
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleCreateTodo}>Add Todo</button>
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
