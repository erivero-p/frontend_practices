const button = document.getElementById('new');
const list = document.getElementById('ft_list');

function saveTasksToCookies() {
    let tasks = [];
    document.querySelectorAll('#ft_list div').forEach(function(task) {
        tasks.push(task.textContent);
    });

    // Guardar las tareas en una cookie (en formato JSON para evitar problemas con caracteres especiales)
    document.cookie = "tasks=" + encodeURIComponent(JSON.stringify(tasks)) + ";path=/";
}

window.onload = function loadTasksFromCookies() {
    let cookies = document.cookie.split('; ');
    let tasksCookie = cookies.find(cookie => cookie.startsWith('tasks='));

    if (tasksCookie) {
        // Extraer el valor de la cookie y parsearlo como JSON
        let tasks = JSON.parse(decodeURIComponent(tasksCookie.split('=')[1]));
        tasks.reverse();
        tasks.forEach(function(task) {
            addTask(task);
        });
    }
}


function ableToDelete(newTask) {
    newTask.addEventListener('click', function() {
        if (confirm('Do you want to delete this task?')) {
            newTask.remove();
            saveTasksToCookies();
        }
    });
}

function addTask(task) {
    let newTask = document.createElement('div');
    newTask.textContent = task;
    ableToDelete(newTask);
    list.insertBefore(newTask, list.firstChild);
    newTask.style.margin = '10px';
    saveTasksToCookies();
}

button.addEventListener('click', function() {
    let task = prompt('Enter a task:');
    if (task !== null && task.trim() !== '') {
        addTask(task);
       }
});
