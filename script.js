// Load tasks from localStorage when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.innerHTML = ""; // Clear current tasks

    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    addTaskToDOM(taskText, false);
    taskInput.value = ""; // Clear input
    updateLocalStorage();
}

function addTaskToDOM(taskText, isCompleted) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    li.innerHTML = `
        <span class="${isCompleted ? 'completed' : ''}">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    // Toggle completed status on click
    li.querySelector("span").addEventListener("click", function() {
        this.classList.toggle("completed");
        updateLocalStorage();
    });

    // Double-click to edit task
    li.querySelector("span").addEventListener("dblclick", function() {
        const newText = prompt("Edit task:", this.textContent);
        if (newText !== null && newText.trim() !== "") {
            this.textContent = newText.trim();
            updateLocalStorage();
        }
    });

    taskList.appendChild(li);
}

function deleteTask(button) {
    button.parentElement.remove();
    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}