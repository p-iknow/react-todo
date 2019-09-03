import React, { useState } from 'react';
import './Form.scss';

const Form = ({ todos, setTodos }) => {

  const [value, setValue] = useState('');

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
