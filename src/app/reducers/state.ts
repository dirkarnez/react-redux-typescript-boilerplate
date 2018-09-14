import { TodoModel } from 'app/models';
import { RouterState } from 'connected-react-router';

export interface RootState {
  todos: RootState.TodoState,
  router?: RouterState
}

export namespace RootState {
  export type TodoState = TodoModel[];
}
