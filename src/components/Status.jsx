import React from 'react';
import './Status.scss';

const Status = () => {
  const all = '10';
  const todo = '5';
  const done = '5';
  return (
    <div className="status">
      <div className="counter all">ALL: {all}</div>
      <div className="counter todo">TODO: {todo}</div>
      <div className="counter done">DONE: {done}</div>
    </div>
  );
};

export default Status;
