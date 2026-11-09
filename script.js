const input = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

function showTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.textContent = tasks[i].text;

    if (tasks[i].done) {
      li.classList.add("done");
    }

    li.addEventListener("click", function () {
      tasks[i].done = !tasks[i].done;
      saveTasks();
      showTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      tasks.splice(i, 1);
      saveTasks();
      showTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  }
}

addTaskBtn.addEventListener("click", function () {
  const item = input.value.trim();
  if (item) {
    tasks.push({ text: item, done: false });
    saveTasks();
    showTasks();
    input.value = "";
  }
});

loadTasks();
showTasks();