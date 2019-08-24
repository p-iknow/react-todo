import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate.jsx';
import TodoItemList from './components/TodoItemList.jsx';
import Form from './components/Form.jsx';
import Status from './components/Status.jsx';
import { ERROR_MSG } from './constants';

class App extends Component {
  state = { input: '', todos: [] };

  componentDidMount = async () => {
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

  render() {
    const { input, todos } = this.state;
    const { onChange, onCreate, onKeyPress, onToggle, onRemove } = this;

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
      >
        <TodoItemList onToggle={onToggle} onRemove={onRemove} todos={todos} />
      </TodoListTemplate>
    );
  }
}
export default hot(App);
