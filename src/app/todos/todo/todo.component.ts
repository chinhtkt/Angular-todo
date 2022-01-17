import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../../todo";
import * as ToDoActions from "../state/todo.action";
import ToDoState from "../../todos/state/todo.state";
import { TodoService } from "../state/todo.httpservice";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { getSelectedCompletedTodo, getTodos } from "../state/todo.selector";
@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  isCompleted$: Observable<boolean>
  isCompleted?: boolean;
  toDo: Todo[];
  todoForm: FormGroup;
  submitted = false;
  id: number;
  todoError: Error | null | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ todos: ToDoState }>,
    private todoService: TodoService
  ) {
    this.todos$ = store.select(getTodos);
    this.isCompleted$ = store.select(getSelectedCompletedTodo)
  }

  ngOnInit(): void {
    this.todos$.subscribe((x) => {
      console.log(x)
      this.toDo = JSON.parse(JSON.stringify(x))
    })
    this.todoForm = this.fb.group({
      task: ["", [Validators.required]],
      date: ["", [Validators.required]],
    });
    this.getTodos();
  }


  getTodos(): void {
    this.store.dispatch(ToDoActions.BeginGetToDosAction());
  }

  addTodo(): void {
    const newTodo: Todo = {
      name: this.todoForm.value["task"],
      DoB: new Date(this.todoForm.value["date"]),
    };
    this.todoForm.reset();
    this.store.dispatch(
      ToDoActions.BeginCreateTodoAction({ payload: newTodo })
    );
  }

  get f() {
    return this.todoForm.controls;
  }

  deleteTodo(SelectedId: number): void {
    this.store.dispatch(ToDoActions.BeginDeleteTodoAction({ id: SelectedId }));
  }
  completeTodo(id: number): void {
    this.store.dispatch(ToDoActions.SuccessEditCompletedAction({ payload: this.toDo[id] }));
    // this.todoService.updateTodoComplete(this.toDo[id]).subscribe();
    // this.store.dispatch(ToDoActions.BeginEditCompletedAction({ id: id }))
  }
}
