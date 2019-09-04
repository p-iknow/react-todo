import React from 'react';
import { MdDone, MdDelete } from 'react-icons/md';
import './TodoItem.scss';
import { useTodoDispatch } from '../../../TodoContext';

const TodoItem = ({ title, id, status }) => {
  const dispatch = useTodoDispatch();

  const onToggle = () => {
    dispatch({
      type: 'TODO_TOGGLE',
      id
    });
  };

  const onRemove = () => {
    dispatch({
      type: 'TODO_REMOVE',
      id
    });
  };

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
