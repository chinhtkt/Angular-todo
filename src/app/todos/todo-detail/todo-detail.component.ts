import { Component, OnInit } from '@angular/core';
import { TodoService } from '../state/todo.httpservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Todo } from '../../todo'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import ToDoState from '../state/todo.state';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import * as ToDoActions from '../state/todo.action'
import { getSelectedTodo } from '../state/todo.selector';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo$: Observable<Todo | undefined>;
  date: Date;
  todoForm!: FormGroup;
  submitted = false;

  constructor(private router: Router,private route: ActivatedRoute, private todoService: TodoService, private location: Location, private fb: FormBuilder, private store: Store<ToDoState>) {
    this.todo$ = this.store.select(getSelectedTodo)
    this.store.dispatch(ToDoActions.BeginGetTodoAction({id: Number(this.route.snapshot.paramMap.get('id'))}));
    this.todo$.subscribe((x) => {
      this.date = x!.DoB
      this.todoForm.patchValue({
        task: x?.name,
        id: x?.id
      })
    })
   }

  ngOnInit(): void {
    this.todoForm = this.fb.group(
      {
      id: [''],
      task: ['', [Validators.required]],
    })

  }
  saveNewtodo(): void {
    this.submitted = true;
    const newTask: Todo = {
      id: this.todoForm.value['id'],
      name: this.todoForm.value['task'],
      DoB: this.date,
    }
    this.store.dispatch(ToDoActions.BeginEditToDoAction({payload: newTask}));
    this.location.back()
  }

}
