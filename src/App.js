import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';
import TodoListTemplate from './components/TodoListTemplate.jsx';
import TodoItemList from './components/TodoItemList.jsx';
import Form from './components/Form.jsx';
import Status from './components/Status.jsx';
import Subtitle from './components/Subtitle.jsx';
import { sleep } from './utils';
import { ERROR_MSG } from './constants';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [folded, setFolded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      const errorMsg = ERROR_MSG.FETCh;
      // 2초간 loading 화면을 보여주기 위한 세팅
      await sleep();
      try {
        const response = await fetch(FetchUrl);
        if (!response.ok) throw new Error(errorMsg);

        const data = await response.json();

        if (!data.statusCode === 200) throw new Error(errorMsg);
        setTodos(data.body);
        setLoading(false);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const onCreate = () => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: value,
        status: 'todo'
      }
    ]);
    setValue('');
  };

  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      onCreate();
    }
  };

  const onToggle = id => {
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const selectedStatus = selected.status;
    const nextTodos = [...todos];
    nextTodos[index] = {
      ...selected,
      status: selectedStatus === 'done' ? 'todo' : 'done'
    };
    setTodos(nextTodos);
  };

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  const onFold = () => {
    setFolded(!folded);
  };

  return (
    <TodoListTemplate
      form={
        <Form
          value={value}
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
};
export default hot(App);
