import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: string = '';
  completedTodosCount: number = 0;

  constructor() {
    console.log("Constructiong the component...");
  }
  myOnclick(){
    console.log("Clicked");
     this.todos = [];
     localStorage.removeItem("todos");
     this.calculateCompletedTodo();

    //  location.reload();
  }

  ngOnInit(): void {
    // Initialization
    let localTodos: Todo[] = [];

    const expectedTodos = localStorage.getItem('todos');
    if(expectedTodos != null) {
      localTodos = JSON.parse(expectedTodos);
    }

    this.todos = localTodos;

    this.calculateCompletedTodo();
  }

  addTodo() {
    console.log("The user typed...", this.newTodo);
    const newTodo = this.newTodo.trim();
    if (newTodo == "" || newTodo.length < 3) {
      return;
    }
    const todo = new Todo(this.newTodo);
    this.todos.push(todo); // JSON
    // console.log("\n Before Conversion Todo: ");
    // console.log(todo);
    // localStorage.setItem('todo', JSON.stringify(todo));

    // const retrievedTodo = localStorage.getItem('todo');
    // console.log("\n Just Retrieved...");
    // console.log(retrievedTodo);
    // const convertedTodo = JSON.parse(retrievedTodo!);
    // console.log("\n After Conversion Todo: ");
    // console.log(convertedTodo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.newTodo = "";
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(function (todo) { 
      return todo.id !== id;
    });
  }

  editTodo(id: string) {
    const todo = this.todos.find(function (todo) {
      return todo.id === id;
    });
    if (todo === undefined) {
      return;
    }
    const todoIndex = this.todos.findIndex(function (todo) {
      return todo.id === id;
    });
    console.log(todo);
    const editedTitle = prompt("Title: ", todo.title);
    todo.title = editedTitle ?? todo.title;
    this.todos.splice(todoIndex, 1, todo);
  }

  toggle(id: string) {
    const todo = this.todos.find(function (todo) {
      return todo.id === id;
    });
    if (todo === undefined) {
      return;
    }
    todo.completed = !todo.completed;
    this.calculateCompletedTodo();
  }

  calculateCompletedTodo() {
    let count = 0;
    this.todos.forEach((todo) => {
      if (todo.completed == true) {
        count++;
      }
    });

    this.completedTodosCount = count;
  }

}

