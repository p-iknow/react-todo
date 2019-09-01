import React from 'react';
import { MdDone, MdDelete } from 'react-icons/md';
import './TodoItem.scss';

const TodoItem = ({ title, id, onToggle, onRemove, status }) => {
  console.log('TodoItem 컴포넌트가 변동되고 있습니다.');
  return (
    <div
      role="presentation"
      className="todo-item"
      onClick={() => {
        onToggle(id);
      }}
    >
      <div className={`check-circle ${status === 'done' && 'done'}`}>
        {status === 'done' && <MdDone />}
      </div>
      <div className={`todo-text ${status === 'done' && 'checked'}`}>
        <div>{title}</div>
      </div>
      <div
        className="remove"
        onClick={e => {
          e.stopPropagation();
          onRemove(id);
        }}
      >
        <MdDelete />
      </div>
    </div>
  );
};
export default TodoItem;
