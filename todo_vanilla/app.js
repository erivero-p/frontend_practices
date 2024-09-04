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
	});
	/* with classList we can acced to the css class of the taskText */
	/* toggle is a method to add or remove a class from an elements class list */
	const taskText = document.createElement('span'); /* span is a generic inline container */
	taskText.textContent = task.tittle;
	taskText.classList.toggle('completed', task.isCompleted);

	taskDeleteButton = document.createElement('button');
	taskDeleteButton.textContent = 'task\'nt';
	taskDeleteButton.addEventListener('click', function() {
/* 		taskElement.remove();
		const taskIndex = app.tasks.indexOf(task);
		app.tasks.splice(taskIndex, 1); */
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