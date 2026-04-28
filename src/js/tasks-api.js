//TODO: BaseURL(https://69f06c1fc1533dbedc9cde50.mockapi.io)

import axios from 'axios';

export const getAllTasks = () => {
  return axios.get('https://69f0a537c1533dbedc9d7348.mockapi.io/todo');
};

export const createNewTask = task => {
  return axios.post(`https://69f0a537c1533dbedc9d7348.mockapi.io/todo`, task);
};

export const deleteTaskById = taskId => {};
