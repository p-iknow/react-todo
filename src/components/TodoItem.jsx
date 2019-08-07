import React, { Component } from 'react';
import './TodoItem.scss';

class TodoItem extends Component {
  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;

    return (
      <div
        role="presentation"
        className="todo-item"
        onClick={() => onToggle(id)}
      >
        <div
          className="remove"
          onClick={e => {
            e.stopPropagation();
            onRemove(id);
          }}
        >
          &times;
        </div>
        <div className={`todo-text ${checked ? 'checked' : ''}`}>
          <div>{text}</div>
        </div>
        {checked && <div className="check-mark">&#x2713;</div>}
      </div>
    );
  }
}

export default TodoItem;
