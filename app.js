// Selectors
let todoInput = document.querySelector('.todo-input');
let todoBtn = document.querySelector('.todo-btn');
let todoList = document.querySelector('.todo-list');
let filterOption = document.querySelector('.filter-todo');

// Add Event Listeners for btn clicks that triggers functions
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



// ----- Functions

// Add list element
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    // Create todo html div el
    let todoDiv = document.createElement('div');
    // add class to div el
    todoDiv.classList.add('todo');
    // create li
    let newTodo = document.createElement('li');
    // render user input
    newTodo.textContent = todoInput.value;
    newTodo.classList.add('todo-item');
    // place todo list el in the todo div
    todoDiv.appendChild(newTodo);
    //---ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    // Create Complete or checkmark btn
    let completedBtn = document.createElement('button');
    // add icon to btn
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    // add btn to todo div
    todoDiv.appendChild(completedBtn);
     // Create delete btn
     let deleteBtn = document.createElement('button');
     // add icon to btn
     deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
     deleteBtn.classList.add('delete-btn');
     // add btn to todo div
     todoDiv.appendChild(deleteBtn);
     // append the new todo div todo-list ul el
     todoList.appendChild(todoDiv);
     // clear todo input value'
     todoInput.value = "";
}

// Delete todo list item
function deleteCheck(e) {
    let item = e.target;
    // delete todo
    if(item.classList[0] === 'delete-btn') {
        let todo = item.parentElement;
        // animation before it is deleted
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('tranitioned', function() {

        });
        
    }

    // checkmark todo list item
    if(item.classList[0] === "complete-btn") {
        let todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

// Filter todos
function filterTodo(e) {
    let todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "incomplete":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  }

  // Save todos
function saveLocalTodos(todo) {
      // check if already have todo
      let todos;
      if(localStorage.getItem('todos') === null) {
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem('todos'));
      }
      //push to todo array
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
  }

function getTodos() {
    // check if already have todo
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Create todo html div el
    let todoDiv = document.createElement('div');
    // add class to div el
    todoDiv.classList.add('todo');
    // create li
    let newTodo = document.createElement('li');
    // render user input
    newTodo.textContent = todo;
    newTodo.classList.add('todo-item');
    // place todo list el in the todo div
    todoDiv.appendChild(newTodo);
    // Create Complete or checkmark btn
    let completedBtn = document.createElement('button');
    // add icon to btn
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    // add btn to todo div
    todoDiv.appendChild(completedBtn);
     // Create delete btn
     let deleteBtn = document.createElement('button');
     // add icon to btn
     deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
     deleteBtn.classList.add('delete-btn');
     // add btn to todo div
     todoDiv.appendChild(deleteBtn);
     // append the new todo div todo-list ul el
     todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    // check if already have todo
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // check the array index of the element that needs to be removed
    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


