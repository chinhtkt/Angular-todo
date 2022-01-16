import { Todo } from '../../todo';

export default interface ToDoState {
  Todo?: Todo
  ToDos: Todo[]
  ToDoError: Error | null
  isCompleted: boolean
}

export const initializeState = (): ToDoState => {
  return { ToDos: Array<Todo>(), Todo: undefined, isCompleted : false, ToDoError: null};
};

