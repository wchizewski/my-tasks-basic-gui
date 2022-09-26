// My Tasks Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let tasksEl = document.getElementById('tasks');

// Global Variables
let tasks = [];

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'add') {
    addTask();
  } else if (selection === 'toggle') {
    toggleTask();
  } else if (selection === 'remove') {
    removeTask();
  } else if (selection === 'clear') {
    clearAll();
  }
}

// MENU FUNCTIONS
function addTask() {
  let description = prompt("Enter task description:");
  tasks.push(newTask(description));
  saveTasks();
  displayAll();
}

function toggleTask() {
  console.log('Toggle Task');
}

function removeTask() {
  console.log('Remove Task');
}

function clearAll() {
  console.log('Clear All');
}

// HELPER FUNCTIONS
// Return a new task object
function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: '',
  };
}

// Display All tasks in global tasks array
function displayAll() {
  let outputStr = '';
  for (let i = 0; i < tasks.length; i++) {
    outputStr += getTaskHTMLStr(tasks[i], i);
  }
  tasksEl.innerHTML = outputStr;
}

// Get html for given task
function getTaskHTMLStr(task, i) {
  return `
    <div>
      ${i}; ${task.description}
    </div>
  `;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}