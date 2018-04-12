import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
private todos = [];
private archiveTodos = [];
  constructor(public http: Http) {
    console.log('Hello TodoProvider Provider');
  }
 getTodos(){
  return this.todos;
 }
 addTodo(todo){
  this.todos.push(todo);
 }
 archiveTodo(todoIndex){
  let todoToBeArchieved = this.todos[todoIndex];
  this.todos.splice(todoIndex,1);
  this.archiveTodos.push(todoToBeArchieved);
 }
 getArchivedTodos(){
   return this.archiveTodos;
 }
}
