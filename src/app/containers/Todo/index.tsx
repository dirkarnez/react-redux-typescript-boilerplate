import * as React from 'react';
import * as style from './style.css';
// import { connect } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';
import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { Header, TodoList, Footer } from 'app/components';
import { RouteComponentProps } from 'react-router';

// const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
//   (key) => TodoModel.Filter[key]
// );

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
};

// @connect(
//   (state: RootState): Pick<AppType.Props, 'todos' | 'filter'> => {
//     const hash = state.router && state.router.location && state.router.location.hash.replace('#', '');
//     const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
//     return { todos: state.todos, filter };
//   },
//   (dispatch: Dispatch): Pick<AppType.Props, 'actions'> => ({
//     actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
//   })
// )

interface AppProps extends RouteComponentProps<void> {

};

interface AppState {
  filter: TodoModel.Filter,
  todos: RootState.TodoState
}
class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps, context?: any) {
    super(props, context);
    this.state = {
      todos: new Array<TodoModel>(),
      filter: TodoModel.Filter.SHOW_ALL
    }
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.state.todos.some(todo => todo.completed || false);
    if (hasCompletedTodo) {
      TodoActions.clearCompleted();
    }
  }

  handleFilterChange(filter: TodoModel.Filter): void {
    this.props.history.push(`#${filter}`);
  }

  render() {
    const { todos, filter } = this.state;
    const activeCount = todos.length - todos.filter(todo => todo.completed).length;
    const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

    return (
      <div className={style.normal}>
        <Header addTodo={TodoActions.addTodo} />
        <TodoList todos={filteredTodos} actions={TodoActions} />
        <Footer
          filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClickClearCompleted={this.handleClearCompleted}
          onClickFilter={this.handleFilterChange}
        /> 
      </div>
    );
  }
}

export default App;