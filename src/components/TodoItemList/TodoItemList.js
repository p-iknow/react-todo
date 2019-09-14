import React from 'react';
import TodoItem from './TodoItem';
import Loader from './Loader';
import Refetch from './Refetch';
import { isEmptyArr } from '../../utils';
import { useTodoState, useFetchState } from '../../TodoContext';

const TodoItemList = () => {
  const { loading, error } = useFetchState();
  const todos = useTodoState();

  if (loading) return <Loader />;
  if (error) return <Refetch />;
  if (isEmptyArr(todos)) return null;

  const list = todos.map(todo => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      title={todo.title}
      status={todo.status}
    />
  ));

  return <div>{list}</div>;
};

export default React.memo(TodoItemList);
