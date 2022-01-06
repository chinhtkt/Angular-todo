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
    if (!name) { return; }
    this.todoService.addTodo({ name } as Todo)
      .subscribe(todos => {
        this.todos.push(todos);
      });
  }
  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    alert(`delete ${todo.name} sucessfully`)
    this.todoService.deleteHero(todo.id).subscribe();
  }
  

}
