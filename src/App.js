import { hot } from 'react-hot-loader/root';
import React from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import { TodoProvider } from './components/TodoContext';

const App = () => {
  return (
    <TodoProvider>
      <TodoListTemplate />
    </TodoProvider>
  );
};

export default hot(App);
