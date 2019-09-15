import React from 'react';
import { useTodoState } from '../TodoContext';
import { countTodoStatus } from '../../utils';

const Home = () => {
  const todos = useTodoState();
  const { todo, done } = countTodoStatus(todos);
  return (
    <>
      <h2>
        반갑습니다.
        <br />
        할일 관리 어플리케이션 입니다.
      </h2>
      <p>
        현재 해야할 일이 <span>{todo}</span>개, <br />
        완료된 일이 <span>{done}</span>개 있습니다.
      </p>
    </>
  );
};

export default Home;
