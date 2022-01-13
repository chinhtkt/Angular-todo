import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {Todo} from '../../todo'
import * as ToDoActions from '../state/todo.action'
import ToDoState from '../../todos/state/todo.state';
import {TodoService} from '../state/todo.httpservice'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { getTodos } from '../state/todo.selector';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos$: Observable<Todo[]>;
  ToDoSubscription: Subscription;
  todos: Todo[] = [];
  todoForm: FormGroup;
  submitted = false;
  id: number
  todoError: Error | null | undefined


  constructor(private fb: FormBuilder, private store: Store<{ todos: ToDoState }>) { 
    this.todos$ = store.select(getTodos);
  
  }

  ngOnInit(): void {
    // this.ToDoSubscription = this.todos$.pipe(
    //   map(x => {
    //     debugger;
    //     this.todos = x.ToDos;
    //     this.todoError = x.ToDoError
    //   })
    // ).subscribe();

    this.todoForm = this.fb.group(
      {
      task: ['', [Validators.required]],
      date: ['', [Validators.required]],
    })
    this.getTodos();
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }

  getTodos(): void {
    this.store.dispatch(ToDoActions.BeginGetToDosAction());
   }

  addTodo(): void {
    
    const newTodo: Todo = {
      name: this.todoForm.value['task'],
      DoB: new Date(this.todoForm.value['date'])
    }
    this.todoForm.reset();
    console.log(newTodo)
    this.store.dispatch(ToDoActions.BeginCreateTodoAction({payload: newTodo}))
  }

  get f() {
    return this.todoForm.controls
  }

  deleteTodo(SelectedId: number): void {
    console.log(this.todos$);
    this.store.dispatch(ToDoActions.BeginDeleteTodoAction({id: SelectedId}))
  }
  // completeTodo(id: number | undefined): void {
  //     this.todos[id!].completed = !this.todos[id!].completed
  //     this.todoService.updateTodoComplete(this.todos[id!]).subscribe();
  // }
}
