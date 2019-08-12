/* eslint-disable dot-notation */

import React from 'react';
import './TodoListTemplate.scss';

const TodoListTemplate = ({ form, nav, children }) => {
  return (
    <main className="todo-list-template">
      <div className="title">Todo List</div>
      <section className="form-wrapper">{form}</section>
      <nav className="nav-wrapper">{nav}</nav>
      <section className="todos-wrapper">{children}</section>
    </main>
  );
};

export default TodoListTemplate;
