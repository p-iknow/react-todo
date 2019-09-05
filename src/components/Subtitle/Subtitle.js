import React from 'react';
import './Subtitle.scss';
import { IoIosArrowDown } from 'react-icons/io';

const Subtitle = ({ folded, setFolded }) => {
  return (
    <div className="subTitle">
      <div className="name">TODO ITEMS</div>
      <IoIosArrowDown
        className={`fold ${folded ? 'rotate' : ''}`}
        onClick={() => {
          setFolded(!folded);
        }}
      />
    </div>
  );
};

export default Subtitle;
