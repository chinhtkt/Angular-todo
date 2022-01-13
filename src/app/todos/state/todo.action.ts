import { createAction, props } from '@ngrx/store';
import { Todo } from '../../todo'
export const GetToDoAction = createAction('[ToDo] - Get ToDo');

export const BeginGetToDoAction = createAction('[ToDo] - Begin Get ToDo');

export const SuccessGetToDoAction = createAction(
  '[ToDo] - Sucess Get ToDo',
  props<{ payload: Todo[] }>()
);
export const BeginCreateTodoAction = createAction(
  '[ToDo] - Begin Create ToDo',
  props<{ payload: Todo }>()
)
export const SuccessCreateToDoAction = createAction(
  '[ToDo] - Sucess Create ToDo',
  props<{ payload: Todo }>()
);
export const BeginDeleteTodoAction = createAction(
  '[ToDo] - Begin Delete ToDo',
  props<{ id: number }>()
)
export const SuccessDeleteToDoAction = createAction(
  '[ToDo] - Sucess Delete Todo',
  props<{ id: number }>()
)
export const BeginEditToDoAction = createAction(
  '[ToDo] - Begin Edit ToDo',
  props<{ payload: Todo }>()
)
export const SuccessEditToDoAction = createAction(
  '[ToDo] - Sucess Edit ToDo',
  props<{ payload: Todo }>()
)

export const ErrorToDoAction = createAction('[ToDo] - Error', props<Error>());