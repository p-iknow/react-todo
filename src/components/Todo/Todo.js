import React, { useState } from 'react';
import TodoItemList from './TodoItemList';
import Form from './Form';
import Status from './Status';
import Subtitle from './Subtitle';
import './Todo.scss';

const Todo = () => {
  const [folded, setFolded] = useState(false);
  return (
    <>
      <section className="form-wrapper">
        <Form />
      </section>
      <section className="status-wrapper">
        <Status />
      </section>
      <section className="subtitle-wrapper">
        <Subtitle folded={folded} setFolded={setFolded} />
      </section>
      <section className={`todos-wrapper ${folded ? 'folded' : ''}`}>
        <TodoItemList />
      </section>
    </>
  );
};

export default Todo;
