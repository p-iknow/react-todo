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
  const [todosFetchState, refetch] = useFetch({ fetchUrl: FetchUrl });
  const { data, loading, error } = todosFetchState;
  useEffect(() => {
    setTodos(data);
    // eslint-disable-next-line
  }, [data]);

  const onFold = () => {
    setFolded(!folded);
  };

  return (
    <TodoListTemplate
      form={<Form todos={todos} setTodos={setTodos} />}
      status={<Status todos={todos} />}
      folded={folded}
      subtitle={<Subtitle folded={folded} onFold={onFold} />}
    >
      <TodoItemList
        todos={todos}
        setTodos={setTodos}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </TodoListTemplate>
  );
};
export default hot(App);
