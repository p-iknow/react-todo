import React from 'react';
import './Form.scss';

const Form = ({
  value,
  folded,
  onFoldClick,
  onChange,
  onCreate,
  onKeyPress
}) => {
  return (
    <div className="form">
      <i className={`fold-button far fa-caret-square-${folded? 'down':'up'}`}></i>
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
