import React from 'react';
import './Fallback.scss';

const Fallback = ({ location }) => {
  const { pathname } = location;
  return (
    <section className="fallback-wrapper">
      <h2>Error 404</h2>
      <p>{pathname} 페이지는 존재하지 않습니다.</p>
    </section>
  );
};

export default Fallback;
