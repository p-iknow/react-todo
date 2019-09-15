import React from 'react';
import './About.scss';

const About = () => {
  return (
    <section className="about-wrapper">
      <img src={ImgURL} alt="todolist" width="200" height="200" />
      <h2>TODO LIST?</h2>
      <p>당신의 삶을 개선할 수 있도록 돕는 어플리케이션</p>
    </section>
  );
};

export default About;
