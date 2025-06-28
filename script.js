document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

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
    taskInput.value = "";
    updateLocalStorage();
}

function addTaskToDOM(taskText, isCompleted) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    li.innerHTML = `
        <input type="radio" class="radio-btn" ${isCompleted ? 'checked' : ''}>
        <span class="task-content ${isCompleted ? 'completed' : ''}">${taskText}</span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    li.querySelector(".radio-btn").addEventListener("click", function() {
        const taskContent = this.nextElementSibling;
        taskContent.classList.toggle("completed");
        updateLocalStorage();
    });

    taskList.appendChild(li);
}

function editTask(button) {
    const li = button.closest("li");
    const taskContent = li.querySelector(".task-content");
    const newText = prompt("Edit task:", taskContent.textContent);

    if (newText !== null && newText.trim() !== "") {
        taskContent.textContent = newText.trim();
        updateLocalStorage();
    }
}

function deleteTask(button) {
    button.closest("li").remove();
    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-content").textContent,
            completed: li.querySelector(".radio-btn").checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}