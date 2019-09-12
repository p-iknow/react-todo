import React, { useState } from 'react';
import { useTodoDispatch } from '../../TodoContext';
import { isBlank } from '../../utils';
import './Form.scss';

const Form = () => {
  const [value, setValue] = useState('');
  const dispatch = useTodoDispatch();

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const onCreate = () => {
    if (isBlank(value)) return null;
    dispatch({
      type: 'TODO_CREATE',
      todo: {
        id: Date.now(),
        title: value,
        status: 'todo'
      }
    });
    setValue('');
  };

  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      onCreate();
    }
  };

  return (
    <div className="form">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default Form;
