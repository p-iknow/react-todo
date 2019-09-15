import React, { useReducer, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFetch } from './hooks';
import { todoReducer } from './reducer';

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const FetchStateContext = createContext();
const RefetchContext = createContext();

export function TodoProvider({ children }) {
  const [todoState, todoDispatch] = useReducer(todoReducer, []);

  const [fetchState, refetch] = useFetch({ fetchUrl: FetchUrl });
  const { data } = fetchState;

  useEffect(() => {
    if (data) {
      todoDispatch({ type: 'TODO_UPLOAD', todos: data });
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <TodoStateContext.Provider value={todoState}>
      <TodoDispatchContext.Provider value={todoDispatch}>
        <FetchStateContext.Provider value={fetchState}>
          <RefetchContext.Provider value={refetch}>
            {children}
          </RefetchContext.Provider>
        </FetchStateContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useFetchState() {
  const context = useContext(FetchStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useRefetch() {
  const context = useContext(RefetchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
