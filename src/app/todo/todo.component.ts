import { Component, OnInit } from '@angular/core';
import {Todo} from '../todo'
import {TodoService} from '../todo.service'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = []
  todoDetail?: Todo;
  

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return alert('Please enter name!'); }
    this.todoService.addTodo({ name } as Todo)
      .subscribe(todos => {
        this.todos.push(todos);
      });
  }
  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    alert(`Delete ${todo.name} sucessfully`)
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  complete(id: number): void {
      let newTodo = this.todos.filter(t => t.id === id)[0]
      console.log(newTodo)
      newTodo.completed = !newTodo.completed
      this.todoService.updateTodoComplete(id).subscribe();
  }
  

}
