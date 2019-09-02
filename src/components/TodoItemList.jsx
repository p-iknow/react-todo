import React from 'react';
import TodoItem from './TodoItem.jsx';
import Loader from './Loader.jsx';
import Refetch from './Refetch.jsx';

const TodoItemList = ({
  todos,
  onToggle,
  onRemove,
  loading,
  error,
  refetch
}) => {
  if (loading) return <Loader />;
  if (error) return <Refetch refetch={refetch} />;
  if (!todos) return null;
  const list = todos.map(todo => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      title={todo.title}
      status={todo.status}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  ));

  return <div>{list}</div>;
};

export default TodoItemList;
