const taskList = document.querySelector('#task-list'); 
/* with document we're getting the DOM, wich is the Object Model of the HTML Document 
with querySelector we're getting the first element that matches the selector */
const newTaskInput = document.querySelector('#input');
const addTaskButton = document.querySelector('#button');

const tasks = [];

const app = {
	tasks: tasks,
	taskList: taskList,
	newTaskInput: newTaskInput,
}

function createTask(tittle, isCompleted = false) {
	return {
		id: Date.now(),
		tittle,
		isCompleted,
	};
}

function addTaskToList(task, taskList) {
	const taskElement = createTaskElement(task);
	taskList.appendChild(taskElement);
}

function addTask(app) {
	const newTaskTitle = app.newTaskInput.value;
	const newTask = createTask(newTaskTitle);
	app.tasks.push(newTask); /* adding a new item to the tasks array */

	addTaskToList(newTask, app.taskList);
	app.newTaskInput.value = ''; /* cleaning the input after click in the button */
}

function createTaskElement(task) {
	const taskElement = document.createElement('li');
	const taskCheckBox = document.createElement('input');
	taskCheckBox.type = 'checkbox';
	taskCheckBox.checked = task.isCompleted;
	taskCheckBox.addEventListener('change', function(event) {
		task.isCompleted = event.target.checked;
		taskText.classList.toggle('completed', task.isCompleted);
	});
	const taskText = document.createElement('span');
	taskText.textContent = task.tittle;
	taskText.classList.toggle('completed', task.isCompleted);

	return taskElement;
}