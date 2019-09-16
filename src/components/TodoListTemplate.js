import React from 'react';
import './TodoListTemplate.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Todo from './Todo';
import Home from './Home';
import About from './About';
import Fallback from './Fallback';

const TodoListTemplate = () => {
  return (
    <main className="todo-list-template">
      <h1 className="title">TODO LIST</h1>
      <Router>
        <Nav />
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route path="/todo" component={Todo} />
          <Route path="/about" component={About} />
          <Route component={Fallback} />
        </Switch>
      </Router>
    </main>
  );
};

export default TodoListTemplate;
