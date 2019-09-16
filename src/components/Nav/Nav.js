import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

const onPaths = paths => {
  return (match, location) => {
    return paths.includes(location.pathname);
  };
};

const Nav = () => {
  return (
    <nav>
      <ul className="links">
        <li className="link-wrapper">
          <NavLink
            className="link"
            activeClassName="selected"
            to="/home"
            isActive={onPaths(['/', '/home'])}
          >
            Home
          </NavLink>
        </li>
        <li className="link-wrapper">
          <NavLink className="link" activeClassName="selected" to="/todo">
            Todo
          </NavLink>
        </li>
        <li className="link-wrapper">
          <NavLink className="link" activeClassName="selected" to="/about">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
