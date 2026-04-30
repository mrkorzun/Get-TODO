//TODO: BaseURL(https://69f06c1fc1533dbedc9cde50.mockapi.io)

import axios from 'axios';

axios.defaults.baseURL = 'https://69f0a537c1533dbedc9d7348.mockapi.io';

export const getAllTasks = async () => {
  const { data } = await axios.get('/todo');
  return data;
};

export const createNewTask = async task => {
  const { data } = await axios.post(`/todo`, task);
  return data;
};

export const deleteTaskById = async taskId => {
  const { data } = await axios.delete(`/todo/${taskId}`);
  return data;
};
