import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Todo } from 'src/app/todo';
import * as ToDoActions from './todo.action';
import { TodoService } from './todo.httpservice';



@Injectable()
export class TodoEffects {
    constructor(private todoService: TodoService, private action$: Actions) { }
    GetTodos$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(ToDoActions.BeginGetToDosAction),
            mergeMap(action =>
                this.todoService.getTodos().pipe(
                    map((data: Todo[]) => {
                        return ToDoActions.SuccessGetToDosAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(ToDoActions.ErrorToDoAction(error))
                    })
                )
            )
        )
    );
    GetTodo$: Observable<Action> = createEffect(() => 
       this.action$.pipe(
           ofType(ToDoActions.BeginGetTodoAction),
           mergeMap(action => 
                this.todoService.getTodo(action.id).pipe(
                    map((data: Todo) => {
                        return ToDoActions.SuccessGetTodoAction({payload: data});
                    }),
                    catchError((error: Error) => {
                        return of(ToDoActions.ErrorToDoAction(error))
                    })
                )
            )
       )
    )

    CreateToDo$: Observable<Action> = createEffect(() =>
     this.action$.pipe(
         ofType(ToDoActions.BeginCreateTodoAction),
         mergeMap(action =>
            this.todoService.addTodo(action.payload).pipe(
                map((data: Todo) => {
                    return ToDoActions.SuccessCreateToDoAction({payload: data});
                }),
                catchError((error: Error) => {
                    return of(ToDoActions.ErrorToDoAction(error))
                })
            )    
        )
     )
    )
    DeleteToDo$: Observable<Action> = createEffect(() =>
      this.action$.pipe(
          ofType(ToDoActions.BeginDeleteTodoAction),
          mergeMap(action => 
            this.todoService.deleteTodo(action.id).pipe(
                map(() => {
                    return ToDoActions.SuccessDeleteToDoAction({id: action.id})
                })
            )    
        )
      )
    )
    EditToDo$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(ToDoActions.BeginEditToDoAction),
            mergeMap(action =>
                this.todoService.updateTodo(action.payload).pipe(
                    map((data: Todo) => {
                        return ToDoActions.SuccessEditToDoAction({payload: data})
                    })
                )
            )
        )
    )

    
}
