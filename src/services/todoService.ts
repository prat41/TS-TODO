import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getTodos = async () => {
  return await axios.get(API_URL);
};

export const createTodo = async (title: string) => {
  return await axios.post(API_URL, { title });
};

export const updateTodo = async (id: string, completed: boolean) => {
  return await axios.put(`${API_URL}/${id}`, { completed });
};

export const deleteTodo = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};
