import { addItem } from "./assets/api";
import { getArrItem, renderTasks, clearTasks } from "./display";

const taskForm = document.querySelector("#task-form");

// массив, содержащий значения чилдрены формы (мне так удобнее обращаться..)

// Функция проверяющая на фактическое введение значений в форме
const isInputForm = async () => {
  const [title, description, assignedTo] = [
    taskForm.title.value,
    taskForm.description.value,
    taskForm.assignedTo.value,
  ];
  if (title && description && assignedTo) {
    return [title, description, assignedTo];
  }
};
const clearForm = () => {
  taskForm.title.value = "";
  taskForm.description.value = "";
};
export const handlerAddTasks = (tasks) => {
  document
    .querySelector(".task-form")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      if (event.target.closest(".task-add-button")) {
        const [title, description, assignedTo] = await isInputForm();
        // надо переделать, но как?)
        let id;
        await getArrItem("/api/tasks", (tasks) => {
          // Функция выполняющуя вычисление длины массива с задачами
          if (tasks.length == 0) {
            id = 0;
          } else {
            id = tasks.length + 1;
          }
        });
        const newTasks = {
          id: String(id),
          title: title,
          description: description,
          assignedTo: assignedTo,
        };
        addItem(`/api/tasks`, newTasks);
        clearForm();
        clearTasks();
        getArrItem("/api/tasks", renderTasks);
      }
    });
};
