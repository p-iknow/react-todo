import React from 'react';
import TodoItem from './TodoItem.jsx';
import Loader from './Loader.jsx';

const TodoItemList = ({ todos, onToggle, onRemove, loading }) => {
  if (loading) return <Loader />;

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
