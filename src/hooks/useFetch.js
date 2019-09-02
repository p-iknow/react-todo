import { useReducer, useEffect } from 'react';
import { checkStatus } from '../utils';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useFetch({ fetchUrl, deps = [] }) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });

    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      const [message, isSuccess] = checkStatus(data.statusCode);
      if (isSuccess) dispatch({ type: 'SUCCESS', data: data.body });
      else throw new Error(message);
    } catch (e) {
      dispatch({ type: 'ERROR', error: e.message });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useFetch;
