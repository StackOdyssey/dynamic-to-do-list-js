document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage
    loadTasks();

    // Load tasks from localStorage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(function (taskText) {
            addTask(taskText, false); // false = don't re-save to localStorage
        });
    }

    // Add a task to the list and optionally save to localStorage
    function addTask(taskText, save = true) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
        }
    }

    // Update localStorage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(function (li) {
            const text = li.firstChild.textContent;
            tasks.push(text);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Handle task addition from button
    addButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText);
        taskInput.value = "";
    });

    // Handle task addition from Enter key
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText);
            taskInput.value = "";
        }
    });
});