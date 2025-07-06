function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    li.onclick = function(){
        li.classList.toggle('completed');
    };

    document.getElementById('taskList').appendChild(li);
    input.value = '';
}

let tasks = [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on page load
window.onload = function () {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => createTaskElement(task.text, task.completed));
  }
};

// Add a new task
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();

  createTaskElement(task.text, task.completed);
  input.value = "";
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.onclick = function () {
    li.classList.toggle("completed");
    const index = Array.from(document.getElementById("taskList").children).indexOf(li);
    tasks[index].completed = li.classList.contains("completed");
    saveTasks();
  };

  // ✅ Now you can safely create and use the delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "🗑️";
  deleteButton.style.marginLeft = "10px";

  deleteButton.onclick = function (e) {
    e.stopPropagation();
    const index = Array.from(document.getElementById("taskList").children).indexOf(li);
    tasks.splice(index, 1);
    saveTasks();
    li.remove();
  };

  li.appendChild(deleteButton); // ✅ Correct spelling
  document.getElementById("taskList").appendChild(li);
}
