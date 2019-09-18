import React from 'react';
import { FiSettings } from 'react-icons/fi';
import './Loader.scss';

const Loader = ({ location }) => {
  return (
    <section className="Loader-wrapper">
      <FiSettings className="loader" />
      <span className="text">Loading... </span>
    </section>
  );
};

export default Loader;
