import React from 'react';
import ReactDom from 'react-dom';
import App from './App.js';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';
import './scss/generic.scss';

ReactDom.render(<App />, document.querySelector('#root'));
