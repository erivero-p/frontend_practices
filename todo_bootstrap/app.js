document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add');
    const deleteButton = document.querySelector('.delete');
    const taskInput = document.getElementById('todo-input');
    const taskList = document.querySelector('.list-group');

    // Function to toggle delete button visibility
    function toggleDeleteButton() {
        if (taskList.children.length > 0) {
            deleteButton.style.display = 'block';
        } else {
            deleteButton.style.display = 'none';
        }
    }

    // Initially hide the delete button
    deleteButton.style.display = 'none';

    // Function to add a new task
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
            newTask.innerHTML = `
                <div>
                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                    ${taskText}
                </div>
            `;
            taskList.appendChild(newTask);
            taskInput.value = ''; // Clear the input field
            toggleDeleteButton(); // Check if delete button should be shown
        }
    });

    // Function to delete selected tasks
    deleteButton.addEventListener('click', function() {
        const tasks = taskList.querySelectorAll('.list-group-item');
        tasks.forEach(task => {
            const checkbox = task.querySelector('.form-check-input');
            if (checkbox.checked) {
                taskList.removeChild(task);
            }
        });
        toggleDeleteButton(); // Check if delete button should be hidden
    });
});