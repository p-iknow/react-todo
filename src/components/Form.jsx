import React from 'react';
import './Form.scss';

const Form = ({ value, folded, onFold, onChange, onCreate, onKeyPress }) => {
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
