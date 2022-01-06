import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      { id: 1, name: 'Take a walk', completed: true },
      { id: 2, name: 'Hangout', completed: false },
      { id: 3, name: 'Sleep', completed: false },
    ];
    return { todos };
  }


  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}
