import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from './todo.action';
import { Todo } from '../../todo';
import ToDoState, { initializeState } from './todo.state';
import { state } from '@angular/animations';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(ToDoActions.SuccessGetToDosAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  on(ToDoActions.SuccessGetTodoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDo: payload, ToDoError: null };
  }),
  on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  on(ToDoActions.SuccessDeleteToDoAction, (state: ToDoState, { id }) => {
    return {
      ...state,
      ToDos: [...state.ToDos.filter((x) => x.id !== id)],
      ToDoError: null,
    };
  }),
  on(ToDoActions.SuccessEditToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  })
);

export function ToDoReducer(
  state: ToDoState | undefined,
  action: Action
): ToDoState {
  return reducer(state, action);
}
