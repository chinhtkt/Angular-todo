import { Todo } from '../../todo';

export default class ToDoState {
  ToDos: Array<Todo>
  ToDoError: Error | null
}

export const initializeState = (): ToDoState => {
  return { ToDos: Array<Todo>(), ToDoError: null};
};

