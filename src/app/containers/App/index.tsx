import * as React from 'react';
import Loadable from 'react-loadable';
import { RouteComponentProps } from 'react-router';

let LoadableExample = Loadable({
  // loader: () => import("app/components/Example"),
  loader: () => new Promise(resolve => { setTimeout(resolve, 6000) }).then(() => import("app/containers/Todo")),
  loading: () => <p>Loading...</p>
});

interface MyState  {
  on: boolean
}

interface AppProps extends RouteComponentProps<void> {
}

export class App extends React.Component<AppProps, MyState> {
  constructor(props:AppProps){
    super(props);
    this.state = { on: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({on: true});
  }

  render() {
    return (
      <div>
        { 
          this.state.on && 
          <LoadableExample {...this.props} /> 
        }
        {
          !this.state.on && 
          <button onClick={this.handleClick}>123</button>
        }
      </div>
    );
  }
}

