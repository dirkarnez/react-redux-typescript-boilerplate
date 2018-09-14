import * as React from 'react';
import { History } from 'history';
import { Route, Switch } from 'react-router';
import { App as TodoApp } from 'app/containers/App';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';

interface AppProps {
  history: History;
}

export const App = hot(module)(({ history }: AppProps) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/" component={TodoApp} />
    </Switch>
  </ConnectedRouter>
));
