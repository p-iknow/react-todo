import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

class TodoItemList extends Component {
  componentDidMount() {}

  render() {
    const { todos, onToggle, onRemove } = this.props;
    const list = todos.map(todo => (
      <TodoItem key={todo.id} title={todo.title} />
    ));

    return <div>{list}</div>;
  }
}

export default TodoItemList;
