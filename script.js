document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function (taskText) {
        createTaskElement(taskText);
    });

    // Function to create and append a task
    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Function to update localStorage
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(function (li) {
            const text = li.firstChild.textContent;
            tasks.push(text);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        updateLocalStorage();
        taskInput.value = "";
    }

    // Add task on button click
    addButton.addEventListener("click", addTask);

    // Add task on Enter key press
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});