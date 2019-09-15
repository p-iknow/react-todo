import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import TodoListTemplate from './components/TodoListTemplate';
import { TodoProvider } from './components/TodoContext';

const App = () => {
  return (
    <TodoProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/todo" component={TodoListTemplate} />
        </Switch>
      </Router>
    </TodoProvider>
  );
};

export default hot(App);
