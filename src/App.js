import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import TodoListTemplate from './components/TodoListTemplate.jsx';
import TodoItemList from './components/TodoItemList.jsx';
import Form from './components/Form.jsx';
import Status from './components/Status.jsx';
import Subtitle from './components/Subtitle.jsx';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [folded, setFolded] = useState(false);
  const [value, setValue] = useState('');
  const [todosFetchState, refetch] = useFetch({ fetchUrl: FetchUrl });
  const { data, loading, error } = todosFetchState;
  useEffect(() => {
    setTodos(data);
    // eslint-disable-next-line
  }, [data]);

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
      status={<Status todos={todos} />}
      folded={folded}
      subtitle={<Subtitle folded={folded} onFold={onFold} />}
    >
      <TodoItemList
        onToggle={onToggle}
        onRemove={onRemove}
        todos={todos}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </TodoListTemplate>
  );
};
export default hot(App);
