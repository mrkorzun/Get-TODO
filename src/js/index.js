import { getAllTasks } from './tasks-api';
import { createTaskCardTemplate } from './render-functions';
import { refs } from './refs';

const initTasksList = () => {
  getAllTasks()
    .then(({ data: tasksArr }) => {
      const tasksCardTemplate = tasksArr.map(task => createTaskCardTemplate(task)).join('');

      refs.taskList.innerHTML = tasksCardTemplate;
      console.log(tasksCardTemplate);
    })
    .catch(err => {
      console.log(err);
    });
};

initTasksList();
