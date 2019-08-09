import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import TodoListTemplate from './TodoListTemplate.jsx';
import TodoItemList from './TodoItemList.jsx';
import Form from './Form.jsx';
import { ERROR_MSG } from '../constants';

class App extends Component {
  state = { todos: [], folded: false };

  async componentDidMount() {
    const errorMsg = ERROR_MSG.FETCh;
    try {
      const response = await fetch(FetchUrl);
      if (!response.ok) throw new Error(errorMsg);

      const data = await response.json();

      if (!data.statusCode === 200) throw new Error(errorMsg);

      this.setState({ todos: data.body });
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const { todos, folded } = this.state;
    return (
      <TodoListTemplate form={<Form folded={folded} />}>
        <TodoItemList todos={todos} />
      </TodoListTemplate>
    );
  }
}
export default hot(App);
