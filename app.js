//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
  //DOM load events
  document.addEventListener('DOMContentLoaded',getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear task event
  clearBtn.addEventListener('click',clearTasks);
  //Filter events
  filter.addEventListener('keyup',filterTasks);
}

//Get tasks from LS
 function getTasks(){
   let tasks;
   if(localStorage.getItem('tasks')===null){
     tasks = [];
   }
   else{
     tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task){
     const li = document.createElement('li');
     li.className = 'collection-item';
     li.appendChild(document.createTextNode(task));
     const link = document.createElement('a');
     link.className = 'delete-item secondary-content';
     link.innerHTML = '<i class="fa fa-remove"></i>';
     li.appendChild(link);
     taskList.appendChild(li);
   })
 }

//Add task
function addTask(e){
  if(taskInput.value===''){
    alert('Add a Task');
  }
  else{
    //Create li elements
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link elements
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    //Append link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value='';
    e.preventDefault();
  }
}

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('are you sure?')){
      e.target.parentElement.parentElement.remove();
      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove tasks From Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent===task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear tasks
function clearTasks(){
  // taskList.innerHTML = '';

  //faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  //clear from LS

  clearTasksFromLocalStorage();

}

//Clear tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//filter

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display='block';
    }
    else {
      task.style.display = 'none';
    }
  })
}
