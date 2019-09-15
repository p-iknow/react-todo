import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink className="link" activeClassName="selected" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="link" activeClassName="selected" to="/todo">
            할일관리
          </NavLink>
        </li>
        <li>
          <NavLink className="link" activeClassName="selected" to="/about">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
