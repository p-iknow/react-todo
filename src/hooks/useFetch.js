import { useReducer, useEffect } from 'react';
import { checkStatus } from '../utils';
import { fetchReducer } from '../reducer';

function useFetch({ fetchUrl, deps = [] }) {
  const [state, dispatch] = useReducer(fetchReducer, {
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
