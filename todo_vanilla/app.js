 /* Selecting elements from DOM (Object Model of the Html Document) */
/* We'll take them with document.querySelector('#id') */
const taskList = document.querySelector('#task-list'); 
const newTaskInput = document.querySelector('#input');
const addTaskButton = document.querySelector('#button');

const tasks = []; /* empty array to store future tasks */

const app = { /* object to group all the app related variables */
	tasks: tasks,
	taskList: taskList,
	newTaskInput: newTaskInput,
}

function saveTaskToLocalStorage(task) {
/* on localStorage we can only store text, so 
JSON.stringify converts into the tasks into a string */
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
/* this function will be executed when the window is loaded */
window.onload = function loadTasksFromLocalStorage() { 
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach(function(task) {
            app.tasks.push(task); // Update the global tasks array
            addTaskToList(task, taskList);
        });
    }
}


/* this function takes a title and a bool and returns an
object which will represent a task with the embracketed params  */
function createTask(tittle, isCompleted = false) {
	return {
		id: Date.now(),
		tittle,
		isCompleted,
	};
}
/* takes a task object, and the task-list reference to #task-list in the DOM */
/* creates a new list element and appends it to the #task-list */
function addTaskToList(task, taskList) {
	const taskElement = createTaskElement(task);
	taskList.appendChild(taskElement);
}

function addTask(app) {
	const newTaskTitle = app.newTaskInput.value; /* storage input as newTaskTitle */
	const newTask = createTask(newTaskTitle); /* creates a new task object with that title */
	app.tasks.push(newTask); /* adds a new item to the tasks array */

	addTaskToList(newTask, app.taskList);
	saveTaskToLocalStorage(app.tasks);
	app.newTaskInput.value = ''; /* cleans the input after click in the button */
}

function createTaskElement(task) {
	const taskElement = document.createElement('li');
	const taskCheckBox = document.createElement('input');
	taskCheckBox.type = 'checkbox';
	taskCheckBox.checked = task.isCompleted;
	/* the checkbox will be listening to any change */
	taskCheckBox.addEventListener('change', function(event) {
		task.isCompleted = event.target.checked;
		taskText.classList.toggle("completed", task.isCompleted);
		saveTaskToLocalStorage(app.tasks);
	});
	/* with classList we can acced to the css class of the taskText */
	/* toggle is a method to add or remove a class from an elements class list */
	const taskText = document.createElement('span'); /* span is a generic inline container */
	taskText.textContent = task.tittle;
	taskText.classList.toggle('completed', task.isCompleted);

	const taskDeleteButton = document.createElement('button');
	taskDeleteButton.textContent = 'task\'nt';
	taskDeleteButton.addEventListener('click', function() {
		taskElement.remove(); /* removes the task from the DOM */
		const taskIndex = app.tasks.indexOf(task); /* gets the index of the task on the array */
		if (taskIndex > -1)
			app.tasks.splice(taskIndex, 1); /* removes the task from the array */
	/* splice(index, n) removes from  index a n number of elements*/
		saveTaskToLocalStorage(app.tasks);
	});
	taskElement.appendChild(taskCheckBox);
	taskElement.appendChild(taskText);
	taskElement.appendChild(taskDeleteButton);
	return taskElement;
}

addTaskButton.addEventListener('click', function() {
	addTask(app);
});

newTaskInput.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		addTask(app);
	}
});