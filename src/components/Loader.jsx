import React from 'react';
import { FiSettings } from 'react-icons/fi';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <FiSettings className="loader" />
      <span className="text">Loading... </span>
    </div>
  );
};

export default Loader;
