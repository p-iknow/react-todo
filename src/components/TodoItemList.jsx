import React from 'react';
import TodoItem from './TodoItem.jsx';
import Loader from './Loader.jsx';
import Refetch from './Refetch.jsx';

const TodoItemList = ({ todos, setTodos, loading, error, refetch }) => {
  const onToggle = id => {
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const selectedStatus = selected.status;
    const nextTodos = [...todos];
    nextTodos[index] = {
      ...selected,
      status: selectedStatus === 'done' ? 'todo' : 'done'
    };
    setTodos(nextTodos);
  };

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

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
