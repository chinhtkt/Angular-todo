import { Component, OnInit, Input, Output } from '@angular/core';
import {Todo} from '../../todo'
import {TodoService} from '../todo.service'
@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html',
  styleUrls: ['./todo-completed.component.css']
})
export class TodoCompletedComponent implements OnInit {
  @Input() todo?: Todo;
  todos: Todo[] = []
  constructor(private todoService: TodoService) { }
  @Output()

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos)
  }
  

  delete(completedtodo: Todo): void {
    this.todos = this.todos.filter(t => t !== completedtodo);
    alert(`delete ${completedtodo.name} sucessfully`)
    this.todoService.deleteTodo(completedtodo.id).subscribe();
  }


}
