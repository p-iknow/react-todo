import React, { useMemo } from 'react';
import './Status.scss';
import { useTodoState } from '../../TodoContext';
import { isEmptyArr } from '../../utils';

const countTodoStatus = todos => {
  let all;
  let todo;
  let done;

  if (isEmptyArr(todos)) {
    all = 0;
    todo = 0;
    done = 0;
  } else {
    all = todos.length;
    todo = todos.filter(todo => todo.status === 'todo').length;
    done = all - todo;
  }
  return {
    all,
    todo,
    done
  };
};

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
