import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props;
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
  }
}

export default TodoItemList;
