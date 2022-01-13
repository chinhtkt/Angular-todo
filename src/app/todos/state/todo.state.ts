import { Todo } from '../../todo';

export default class ToDoState {
  Todo: Todo | undefined
  ToDos: Array<Todo>
  ToDoError: Error | null
}

export const initializeState = (): ToDoState => {
  return { ToDos: Array<Todo>(), Todo: undefined, ToDoError: null};
};

