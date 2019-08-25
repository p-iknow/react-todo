import React from 'react';
import './TodoListTemplate.scss';

const TodoListTemplate = ({
  form,
  status,
  subtitle,
  folded,
  fold,
  refTodoWrapperHeight,
  height,
  children
}) => {
  return (
    <main className="todo-list-template">
      <div className="title">TODO LIST</div>
      <section className="form-wrapper">{form}</section>
      <section className="status-wrapper">{status}</section>
      <section className="subtitle-wrapper">{subtitle}</section>
      <section
        ref={refTodoWrapperHeight}
        style={{ maxHeight: `${height}` }}
        className={`todos-wrapper ${folded ? 'folded' : ''}`}
      >
        {children}
      </section>
      {fold}
    </main>
  );
};

export default TodoListTemplate;
