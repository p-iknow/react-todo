import React from 'react';
import './Status.scss';

const Status = ({ todos }) => {
  if (!todos) return null;
  const all = todos.length;
  const todo = todos.filter(todo => todo.status === 'todo').length;
  const done = all - todo;
  return (
    <div className="status">
      <div className="counter all">ALL: {all}</div>
      <div className="counter todo">TODO: {todo}</div>
      <div className="counter done">DONE: {done}</div>
    </div>
  );
};

export default Status;
