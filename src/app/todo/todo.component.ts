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

  constructor() {
    console.log("Constructiong the component...");
  }

  ngOnInit(): void {
    // for (const todo of this.todos) {
    //   console.log(todo.title);
    // }
  }

  addTodo() {
    console.log("The user typed...", this.newTodo);
    const newTodo = this.newTodo.trim();
    if (newTodo == "" || newTodo.length < 3) {
      return;
    }
    this.todos.push(new Todo(this.newTodo));
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
  }

}
