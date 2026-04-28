/*
TODO: Task card template

<li class="tasks-list-item">
  <p class="tasks-list-item-text"></p>
  <button class="tasks-list-item-delete-btn" type="button" data-task-id="">
    <svg class="tasks-list-item-delete-btn-icon" width="24" height="24">
      <use href="../img/icons.svg#icon-trash"></use>
    </svg>
  </button>
</li>
*/

export const createTaskCardTemplate = ({ id, text }) => {
  return `
  <li class="tasks-list-item">
  <p class="tasks-list-item-text">${text}</p>
  <button class="tasks-list-item-delete-btn" type="button" data-task-id="${id}">
    <svg class="tasks-list-item-delete-btn-icon" width="24" height="24">
      <use href="../img/icons.svg#icon-trash"></use>
    </svg>
  </button>
</li>
  `;
};
