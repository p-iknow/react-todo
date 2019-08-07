import { hot } from 'react-hot-loader/root';
import React from 'react';
import TodoListTemplate from './TodoListTemplate.jsx';
import TodoItemList from './TodoItemList.jsx';
import Form from './Form.jsx';

const App = props => {
  return (
    <TodoListTemplate form={<Form />}>
      <TodoItemList />
    </TodoListTemplate>
  );
};
export default hot(App);
