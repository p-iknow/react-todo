import React from 'react';
import './TodoListTemplate.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Todo from './Todo';
import Home from './Home';

const TodoListTemplate = () => {
  return (
    <main className="todo-list-template">
      <h1 className="title">TODO LIST</h1>
      <Router>
        <Nav />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/todo" component={Todo} />
        </Switch>
      </Router>
    </main>
  );
};

export default TodoListTemplate;
