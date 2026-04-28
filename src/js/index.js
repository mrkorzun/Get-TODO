import { getAllTasks, createNewTask } from './tasks-api';
import { createTaskCardTemplate } from './render-functions';
import { refs } from './refs';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const initTasksList = () => {
  getAllTasks()
    .then(({ data: tasksArr }) => {
      const tasksCardTemplate = tasksArr.map(task => createTaskCardTemplate(task)).join('');

      refs.taskList.innerHTML = tasksCardTemplate;
      //   console.log(tasksCardTemplate);
    })
    .catch(err => {
      console.log(err);
    });
};

initTasksList();

const onTaskFormSubmit = event => {
  event.preventDefault();
  // проверрить что это не пустая строчка
  const { target: taskFormEl } = event;

  //   console.dir(taskFormEl.elements);
  const newTask = {
    text: taskFormEl.elements.task_text.value.trim(),
  };

  if (!newTask.text) {
    iziToast.error({
      message: 'Поле для ввода не должно быть пустым',
      position: 'topRight',
    });
    return;
  }
  // заблокируем кнопку пока идет отправка на сервер чтобы пользователь не смог отправить много запросов в одну единицу часу
  refs.taskFormSbmtBtn.disabled = true;
  // console.log(newTask);

  // отправляем данные на сервер
  createNewTask(newTask)
    .then(response => {
      iziToast.success({
        message: 'Задача созданна успешно',
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.error({
        message: 'Сталась ошибка при создании',
        position: 'topRight',
      });
      console.log(err);
    }) // включаем кнопку
    .finally(() => {
      refs.taskFormSbmtBtn.disabled = false;
    });
};

refs.taskForm.addEventListener('submit', onTaskFormSubmit);
