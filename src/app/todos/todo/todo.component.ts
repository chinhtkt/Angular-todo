import { Component, OnInit } from '@angular/core';
import {Todo} from '../../todo'
import {TodoService} from '../todo.service'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = []  

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos)
  }

  addTodo(name: string): void {
    name = name.trim();
    if (!name) { return alert('Please enter name!'); }
    this.todoService.addTodo({ name } as Todo)
      .subscribe(todos => {
        this.todos.push(todos);
      });
  }
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    alert(`Delete ${id} sucessfully`)
    this.todoService.deleteTodo(id).subscribe();
  }
  completeTodo(id: number): void {
      this.todos[id].completed = !this.todos[id].completed
      this.todoService.updateTodoComplete(this.todos[id]).subscribe();
  }
}
