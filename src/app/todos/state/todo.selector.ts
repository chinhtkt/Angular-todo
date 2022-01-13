import { createFeatureSelector, createSelector } from '@ngrx/store';
import ToDoState from './todo.state';

export const getTodoState = createFeatureSelector<ToDoState>('todos');

export const getTodos = createSelector(
    getTodoState,
  (state: ToDoState) => state.ToDos
);
