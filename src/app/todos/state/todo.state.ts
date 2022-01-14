import { Todo } from '../../todo';

export default interface ToDoState {
  Todo?: Todo
  ToDos: Array<Todo>
  ToDoError: Error | null
}

export const initializeState = (): ToDoState => {
  return { ToDos: Array<Todo>(), Todo: undefined, ToDoError: null};
};

