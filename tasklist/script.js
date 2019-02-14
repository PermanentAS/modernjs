const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
LoadEventListeners();

//Load all event functions
function LoadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask)

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filtertasks event
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item';

        //Ceate text node and append to li
        li.appendChild(document.createTextNode(task));
        //ceate new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fas fa-times"></i>'
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}

//Add task
function addTask(e) {
    if(taskInput.value === ''){
        e.preventDefault();
    } else {
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';

        //Ceate text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //ceate new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fas fa-times"></i>'
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);

        //Store in Local Storage
        storeTaskInLocalStorage(taskInput.value);

        //clear input
        taskInput.value = '';

        e.preventDefault();
    }   
}

//Store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you shure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks() {
    // taskList.innerHTML = '';

    //Faster variant
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //clear from LS
    clearTasksFromLocalStorage()
}

//clear from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}