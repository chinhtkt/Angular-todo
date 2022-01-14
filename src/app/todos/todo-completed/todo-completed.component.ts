import { Component, OnInit, Input, Output } from '@angular/core';
import {Todo} from '../../todo'
import {TodoService} from '../state/todo.httpservice'
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
  }





}
