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
  let index = prompt("Enter # of task:");
  let task = tasks[index];
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
  let index = +prompt("Enter # of task:");
  if (index >= 0 && index < tasks.length) {
    // Valid Index -> Remove
    tasks.splice(index, 1);
    saveTasks();
    displayAll();
  } else {
    alert("Invalid Task #");
  }
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
    completed: "",
  };
}

// Display All tasks in global tasks array
function displayAll() {
  for (let i = 0; i < tasks.length; i++) {
    tasksEl.appendChild(getTaskHTML(tasks[i], i));
  }
  tasksEl.innerHTML = outputStr;
}

// Get html for given task
function getTaskHTML(task, index) {
  // use java to build the task <div>

  // Check box element
  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.addEventListener("input", checkBoxHandler);

  // task description text node
  let textEl = document.createTextNode(task.description);

  // remove button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove";
  buttonEl.addEventListener("click", removeBtnHandler);

  // add everything to a div element
  let divEl = document.createElement("div");
  divEl.appendChild(checkboxEl);
  divEl.appendChild(textEl);
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
function checkBoxHandler(e) {}

function removeBtnHandler(e) {}
