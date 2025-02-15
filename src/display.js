import { getItems } from "./assets/api";
import { removeItem } from "./assets/api";
import { initTasks } from "./assets/init.js";

const ul = document.querySelector("#task-list");

//Отображение на дисплее. resp = tasks
export const renderTasks = (tasks) => {
  if (Array.isArray(tasks) && tasks.length > 0) {
    const taskElements = tasks.map(
      (task) =>
        `
      <li class="task-item" data-id=${task.id}>
          <div class="task-info">
            <h3 class="task-title">${task.title}</h3>
            <p class="task-desc">${task.description}</p>
            <p class="task-meta">
              <span>Assigned to: <strong>${task.assignedTo}</strong></span>
            </p>
            <span class="task-status">{taskStatus}</span>
          </div>
          <div class="task-actions">
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
          </div>
        </li>`,
    );
    ul.insertAdjacentHTML("beforeend", taskElements.join(""));
  } else {
    return null;
  }
};

export const clearTasks = () => {
  ul.innerHTML = '';
}


//----------Удаление----------


//Создаём событие для всего ul
ul.addEventListener('click', async function(event) {

  //Проверяем, есть ли кнопка с классом delete-task
  if (event.target.classList.contains('delete-task')) {

    //Получаем id элемента, который потенциально удалим
    const id = event.target.closest('.task-item').dataset.id

    //Уточняем, точно ли мы хотим удалить заметку
    let question = confirm("Do you realy want to delete this task?")
    
    if(question){
      
      //Удаляем из бд
      await removeItem(`/api/tasks/${id}`)

      // Удаляем из интерфейса
      initTasks()
    }
  }
});
