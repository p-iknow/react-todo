import React, { useState } from 'react';
import './TodoListTemplate.scss';
import TodoItemList from './TodoItemList';
import Form from './Form';
import Status from './Status';
import Subtitle from './Subtitle';

const TodoListTemplate = () => {
  const [folded, setFolded] = useState(false);

  return (
    <main className="todo-list-template">
      <div className="title">TODO LIST</div>
      <section className="form-wrapper">
        <Form />
      </section>
      <section className="status-wrapper">
        <Status />
      </section>
      <section className="subtitle-wrapper">
        <Subtitle folded={folded} onFold={setFolded} />
      </section>
      <section className={`todos-wrapper ${folded ? 'folded' : ''}`}>
        <TodoItemList />
      </section>
    </main>
  );
};

export default TodoListTemplate;
