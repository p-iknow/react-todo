import React from 'react';
import TodoItem from './TodoItem.jsx';
import Loader from './Loader.jsx';

const TodoItemList = ({ todos, onToggle, onRemove, loading, error }) => {
  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
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
