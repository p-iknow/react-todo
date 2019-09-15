import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';
import TodoListTemplate from './components/TodoListTemplate';
import { TodoProvider } from './components/TodoContext';

const App = () => {
  return (
    <TodoProvider>
      <Router>
        <Nav />
        <Route path="/" component={TodoListTemplate} />
      </Router>
    </TodoProvider>
  );
};

export default hot(App);
