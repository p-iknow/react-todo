import React from 'react';
import PropTypes from 'prop-types';
import './Subtitle.scss';
import { IoIosArrowDown } from 'react-icons/io';

const Subtitle = ({ folded, setFolded }) => {
  const onFold = () => {
    setFolded(!folded);
  };

  return (
    <div className="subTitle">
      <div className="name">TODO ITEMS</div>
      <IoIosArrowDown
        className={`fold ${folded ? 'rotate' : ''}`}
        onClick={onFold}
      />
    </div>
  );
};

Subtitle.propTypes = {
  folded: PropTypes.bool.isRequired,
  setFolded: PropTypes.func.isRequired
};

export default Subtitle;
