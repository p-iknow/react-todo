import React, { Component } from 'react';
import './TodoItem.scss';

class TodoItem extends Component {
  render() {
    const { title, id, onToggle, onRemove } = this.props;

    return (
      <div
        role="presentation"
        className="todo-item"
        onClick={() => onToggle(id)}
      >
        <div className="todo-text">
          <div>{title}</div>
        </div>
        <div
          className="remove"
          onClick={e => {
            e.stopPropagation();
            onRemove(id);
          }}
        >
          &times;
        </div>
      </div>
    );
  }
}

export default TodoItem;
