import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate.jsx';
import TodoItemList from './components/TodoItemList.jsx';
import Form from './components/Form.jsx';
import Status from './components/Status.jsx';
import Subtitle from './components/Subtitle.jsx';
import { sleep } from './utils';

import { ERROR_MSG } from './constants';

class App extends Component {
  state = { input: '', todos: [], folded: false, loading: true };

  componentDidMount = async () => {
    const errorMsg = ERROR_MSG.FETCh;
    // 2초간 loading 화면을 보여주기 위한 세팅
    await sleep();
    try {
      const response = await fetch(FetchUrl);
      if (!response.ok) throw new Error(errorMsg);

      const data = await response.json();

      if (!data.statusCode === 200) throw new Error(errorMsg);

      this.setState({ todos: data.body, loading: false });
    } catch (err) {
      console.warn(err);
    }
  };

  onChange = ({ target }) => {
    this.setState({
      input: target.value
    });
  };

  onCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',
      todos: [
        ...todos,
        {
          id: Date.now(),
          title: input,
          status: 'todo'
        }
      ]
    });
  };

  onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      this.onCreate();
    }
  };

  onToggle = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const selectedStatus = selected.status;
    const nextTodos = [...todos];
    nextTodos[index] = {
      ...selected,
      status: selectedStatus === 'done' ? 'todo' : 'done'
    };

    this.setState({
      todos: nextTodos
    });
  };

  onRemove = id => {
    const { todos } = this.state;
    const nextTodos = todos.filter(todo => todo.id !== id);
    this.setState({
      todos: nextTodos
    });
  };

  onFold = () => {
    const { folded } = this.state;
    this.setState({
      folded: !folded
    });
  };

  render() {
    const { input, todos, folded, loading } = this.state;
    const { onChange, onCreate, onKeyPress, onToggle, onRemove, onFold } = this;

    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            onCreate={onCreate}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        }
        status={<Status />}
        folded={folded}
        subtitle={<Subtitle folded={folded} onFold={onFold} />}
      >
        <TodoItemList
          onToggle={onToggle}
          onRemove={onRemove}
          todos={todos}
          loading={loading}
        />
      </TodoListTemplate>
    );
  }
}
export default hot(App);
