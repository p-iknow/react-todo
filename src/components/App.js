import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import TodoListTemplate from './TodoListTemplate.jsx';
import TodoItemList from './TodoItemList.jsx';
import Form from './Form.jsx';

class App extends Component {
  state = { todos: [] };

  async componentDidMount() {
    try {
      const response = await fetch(
        'https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist'
      );
      if (!response.ok) throw new Error('요청에 문제가 있습니다.');

      const data = await response.json();

      if (!data.statusCode === 200) throw new Error('잘못된 요청입니다.');

      this.setState({ todos: data.body });
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const { todos } = this.state;
    return (
      <TodoListTemplate form={<Form />}>
        <TodoItemList todos={todos} />
      </TodoListTemplate>
    );
  }
}
export default hot(App);
