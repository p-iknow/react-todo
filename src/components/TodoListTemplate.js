import React, { Suspense, lazy } from 'react';
import './TodoListTemplate.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Loader from './Loader';

const Todo = lazy(() => import('./Todo'));
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Fallback = lazy(() => import('./Fallback'));

const TodoListTemplate = () => {
  return (
    <main className="todo-list-template">
      <h1 className="title">TODO LIST</h1>
      <Router>
        <Nav />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route path="/todo" component={Todo} />
            <Route path="/about" component={About} />
            <Route component={Fallback} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

export default TodoListTemplate;
