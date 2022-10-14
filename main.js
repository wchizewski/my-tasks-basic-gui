// My Tasks Basic

// HTML Elements
let taskInputEl = document.getElementById("task-input");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

// Global Variables
let tasks = loadTasks();
displayAll();

// Go Btn - Menu Listener
taskInputEl.addEventListener("keydown", taskSubmitHandler);

function taskSubmitHandler(e) {
  if (e.code === "Enter") {
    newTask();
    // Add Submitted Task
    let userTask = taskInputEl.value;
    tasks.push(newTask(userTask));
    saveTasks();
    displayAll();
    taskInputEl.value = "";
  }
}

// MENU FUNCTIONS
// Toggle completed status of a task
function toggleTask() {
  let taskIndex = +prompt("Enter # of task:");
  let task = tasks[taskIndex];
  if (task.completed === "") {
    task.completed = "completed";
  } else {
    task.completed = "";
  }
  saveTasks();
  displayAll();
}

// Remove a task by index
function removeTask() {
  let taskIndex = +prompt("Enter # of task:");
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayAll();
}

// Clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  displayAll();
}

// HELPER FUNCTIONS
// Return a new task object
function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: false,
  };
}

// Display All tasks in global tasks array
function displayAll() {
  tasksEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tasksEl.appendChild(getTaskHTML(tasks[i], i));
  }
}

// Get html for given task
function getTaskHTML(task, index) {
  // use java to build the task <div>

  // Check box element
  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.dataset.index = index;
  checkboxEl.checked = task.completed;
  checkboxEl.addEventListener("input", checkBoxHandler);

  // task description text node
  let textSpanEl = document.createElement("span");
  textSpanEl.innerHTML = task.description;
  if (task.completed) {
    textSpanEl.className = "completed";
  }

  // remove button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove";
  buttonEl.dataset.index = index;
  buttonEl.addEventListener("click", removeBtnHandler);

  // add everything to a div element
  let divEl = document.createElement("div");
  divEl.appendChild(checkboxEl);
  divEl.appendChild(textSpanEl);
  divEl.appendChild(buttonEl);

  return divEl;
}

// Save global tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  let tasksStr = localStorage.getItem("tasks");
  return JSON.parse(tasksStr) ?? [];
}

// event functions
function checkBoxHandler(e) {
  // get index of tasks to toggle
  let taskIndex = +e.target.dataset.index;
  let task = tasks[taskIndex];
  task.completed = !task.completed;
  saveTasks();
  displayAll();
}

function removeBtnHandler(e) {
  // Get index of task to remove
  let taskIndex = +e.target.dataset.index;
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayAll();
}
