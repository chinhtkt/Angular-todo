import { Component, OnInit } from '@angular/core';
import { TodoService } from '../state/todo.httpservice';
import { ActivatedRoute } from '@angular/router';
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
  ToDoSubscription: Subscription;
  todo!: Todo;
  todoForm!: FormGroup;
  submitted = false;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private location: Location, private fb: FormBuilder, private store: Store<ToDoState>) {
   }

  ngOnInit(): void {
    this.store.dispatch(ToDoActions.BeginGetTodoAction({id: Number(this.route.snapshot.paramMap.get('id'))}))
    this.todo$ = this.store.pipe(select(getSelectedTodo))
    this.ToDoSubscription = this.todo$.pipe(
      map(x => {
        console.log(x)
      })
    ).subscribe();
    this.todoForm = this.fb.group(
      {
      task: ['', [Validators.required]],
    })
  }


  goBack(): void {
    this.location.back();
  }

  saveNewtodo(): void {
    this.submitted = true;
    const newTask: Todo = {
      id: this.todo.id,
      name: this.todoForm.value['task'],
      DoB: this.todo.DoB,
    }
    console.log(newTask)
    this.store.dispatch(ToDoActions.BeginEditToDoAction({payload: newTask}));
    this.goBack();
  }

}
