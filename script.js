const newTaskInput = document.getElementById("new-task");

const addTaskButton = document.getElementById("addTask");

const incompleteTaskList = document.getElementById("items");

const completeTaskList = document.querySelector(".complete-list ul");

let editingTask = null;

// Function to create a new task element
function createTaskElement(taskText) {

//   li creation
  const li = document.createElement("li");
  console.log(li);
  li.classList.add("item");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // completetask event fire
  checkbox.addEventListener("change", completeTask);

  // Label creation
  const label = document.createElement("label");
  label.textContent = taskText;

  // Edit Button create
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit");
  // editbutton click event fire
  editButton.addEventListener("click", editTask);

  // add element to the list item
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(editButton);

  return li;
}

//   add or update  task function
function addOrUpdateTask(event) {
  
  event.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText === "") return;

  if (editingTask) {
    editingTask.querySelector("label").textContent = taskText;
    addTaskButton.value = "Add Task";
    editingTask = null;
  } else {
    // Add new task
    const listItem = createTaskElement(taskText);
    incompleteTaskList.appendChild(listItem);
  }

  newTaskInput.value = "";
}

// adding or updating a task event
addTaskButton.addEventListener("click", addOrUpdateTask);

// Function to edit an existing task
function editTask() {
  const listItem = this.parentElement;
  const label = listItem.querySelector("label"); 
  newTaskInput.value = label.textContent;

  addTaskButton.value = "Update Task";
  editingTask = listItem; 
}

// Function to mark a task as completed
function completeTask() {
  const listItem = this.parentElement; 
  this.remove(); 
  listItem.querySelector(".edit").remove(); 

  //  Delete Button Creation
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", deleteTask);

  listItem.appendChild(deleteButton); 

  //Add the task item to completed panel
  completeTaskList.appendChild(listItem);
}

// Function to delete a completed task
function deleteTask() {
  const listItem = this.parentElement; 
  listItem.remove();
}

