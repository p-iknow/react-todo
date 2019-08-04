import { hot } from 'react-hot-loader/root';
import React from 'react';
import TodoListTemplate from './TodoListTemplate.jsx';
import Form from './Form.jsx';

const App = props => {
  return <TodoListTemplate form={<Form />}> 템플릿 완성 </TodoListTemplate>;
};
export default hot(App);
