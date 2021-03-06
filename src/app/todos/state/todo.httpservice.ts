import { Injectable } from '@angular/core';
import {Todo} from '../../todo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { fn } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'api/todos';


  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      tap(_ => console.log(`get Data Sucessfully`)),
    )
  }
  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => console.log(`fetched todo id=${id}`)),
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
    addTodo(todo: Todo): Observable<Todo> {
      return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
        tap((newTodo: Todo) => alert(`Added task ${newTodo.name} sucessfully`)),
        catchError(this.handleError<Todo>('addTodo'))
      );
    }
    deleteTodo(id: number): Observable<Todo> {
      const url = `${this.todosUrl}/${id}`;

      return this.http.delete<Todo>(url, this.httpOptions).pipe(
        tap(_ => console.log(`Deleted task ${id} sucessfully`)),
        catchError(this.handleError<Todo>('deleteToto'))
      );
    }

  updateTodo(newTask: Todo): Observable<any> {
    const url = `${this.todosUrl}/${newTask.id}`;
    return this.http.put<Todo>(url, newTask, this.httpOptions).pipe(
      tap(_ => console.log(`Updated todo id=${newTask.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }
  updateTodoComplete(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, this.httpOptions).pipe(
      tap(_ => console.log(`Updated completed id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,) { }
}
