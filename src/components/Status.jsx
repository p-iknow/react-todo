import React from 'react';
import './Status.scss';

const Status = ({ todos }) => {
  let all; let todo; let done;

  if (todos) {
    all = todos.length;
    todo = todos.filter(todo => todo.status === 'todo').length;
    done = all - todo;
  } else {
    all = 0;
    todo = 0;
    done = 0;
  }

  return (
    <div className="status">
      <div className="counter all">ALL: {all}</div>
      <div className="counter todo">TODO: {todo}</div>
      <div className="counter done">DONE: {done}</div>
    </div>
  );
};

export default Status;
