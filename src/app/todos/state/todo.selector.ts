import { createFeatureSelector, createSelector } from '@ngrx/store';
import ToDoState from './todo.state';

export const getTodoState = createFeatureSelector<ToDoState>('todos');

export const getTodos = createSelector(
    getTodoState,
  (state: ToDoState) => state.ToDos
);

// export const getTodo = createSelector(
//   getTodoState,
//   (state: ToDoState, id: number) => state.ToDos.filter(x => x.id === id)
// );

export const getSelectedTodo = createSelector(
  getTodoState,
  (state: ToDoState) => {return state.Todo}
)
