//TODO: BaseURL(https://69f06c1fc1533dbedc9cde50.mockapi.io)

import axios from 'axios';

axios.defaults.baseURL = 'https://69f0a537c1533dbedc9d7348.mockapi.io';

export const getAllTasks = () => {
  return axios.get('/todo');
};

export const createNewTask = task => {
  return axios.post(`/todo`, task);
};

export const deleteTaskById = taskId => {
  return axios.delete(`/todo/${taskId}`);
};
