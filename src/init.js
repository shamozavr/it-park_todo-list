import { getArrItem, renderTasks } from "./display.js";
import { filter } from "./filter.js";
import { handlerAddTasks } from "./addTasks.js";

const initTasks = (tasks) => {
  renderTasks(tasks);
  filter(tasks);
  handlerAddTasks(tasks);
};

const initUsers = (users) => {
  const renderUsers = (id) => {
    const select = document.getElementById(id);

    users.map((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;

      select.appendChild(option);
    });
  };

  renderUsers("task-assignee");
  renderUsers("filter-assignee");
  renderUsers("edit-task-assignee");
};

getArrItem("/api/tasks", initTasks);
getArrItem("/api/users", initUsers);
