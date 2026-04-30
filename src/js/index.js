import { getAllTasks, createNewTask, deleteTaskById } from './tasks-api';
import { createTaskCardTemplate } from './render-functions';
import { refs } from './refs';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const initTasksList = async () => {
  try {
    // чистим форму
    refs.taskList.innerHTML = '';
    // делаем прелоадер загрузки тасков
    refs.loader.classList.add('is-active');
    const tasksArr = await getAllTasks();

    const tasksCardTemplate = tasksArr.map(task => createTaskCardTemplate(task)).join('');
    refs.taskList.innerHTML = tasksCardTemplate;
  } catch (error) {
    console.log(error);
  } finally {
    refs.loader.classList.remove('is-active');
  }
};

initTasksList();

const onTaskFormSubmit = async event => {
  try {
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
    await createNewTask(newTask);
    iziToast.success({
      message: 'Задача созданна успешно',
      position: 'topRight',
    });
    // чистим форму
    taskFormEl.reset();
    // перерисовываем список
    initTasksList();
  } catch (error) {
    iziToast.error({
      message: 'Произошла ошибка при создании',
      position: 'topRight',
    });

    console.log(err);
  } finally {
    refs.taskFormSbmtBtn.disabled = false;
  }
};

refs.taskForm.addEventListener('submit', onTaskFormSubmit);

// делаем делегирорвания ивента клик на найближайшему предку
const onDeleteBtnList = async event => {
  try {
    //   console.log('click');
    // нужно сделать клик только по кнопке, поэтмоу ищем ее
    //   console.log(event.target);
    const taskDeleteBtnEl = event.target.closest('.js-tasks-list-item-delete-btn');
    // ничего не выводить если клик не по кнопке
    if (!taskDeleteBtnEl) {
      return;
    }
    //   console.log(taskDeleteBtnEl);
    // прочитать id к какой кнопке он привязан, чтобы удалять
    const currentTaskId = taskDeleteBtnEl.dataset.taskId;
    //   console.log(currentTaskId);
    // формируем запыт на удаление и отправчляем
    await deleteTaskById(currentTaskId);
    iziToast.success({
      message: 'Задача удалена успешно',
      position: 'topRight',
    });
    // перерисовываем уже с удаленными
    initTasksList();
  } catch (error) {
    iziToast.error({
      message: 'Произошла ошибка при удалении',
      position: 'topRight',
    });
  }
};

refs.taskList.addEventListener('click', onDeleteBtnList);
