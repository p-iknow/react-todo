import React from 'react';
import styles from './Form.scss';

// prettier-ignore
/* eslint-disable dot-notation */
const Form = ({value, onChange, onCreate, onKeyPress }) => {
  return (
    <div className={styles["form"]}>
      <input type="text" value={value} onChange={onChange} onKeyPress={onKeyPress} />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>   
  )
}

export default Form;
