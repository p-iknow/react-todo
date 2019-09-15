import React, { useMemo } from 'react';
import './Status.scss';
import { useTodoState } from '../TodoContext';
import { countTodoStatus } from '../../utils';

const Status = () => {
  const todos = useTodoState();
  const count = useMemo(() => countTodoStatus(todos), [todos]);
  const { all, todo, done } = count;

  return (
    <div className="status">
      <div className="counter all">ALL: {all}</div>
      <div className="counter todo">TODO: {todo}</div>
      <div className="counter done">DONE: {done}</div>
    </div>
  );
};

export default React.memo(Status);
