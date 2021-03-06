import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      { id: 0, name: 'Take a walk', completed: true, DoB:new Date()},
      { id: 1, name: 'Hangout', completed: false, DoB:new Date() },
      { id: 2, name: 'Sleep', completed: false , DoB:new Date()},
    ];
    return { todos };
  }


  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id!)) + 1 : 11;
  }
}
