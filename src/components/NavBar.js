import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
  
  render() {
    return (
      <nav className="Nav-Bar flex">
        <NavLink exact className="capitalize" activeClassName="active" to="/">all facts</NavLink>
        <NavLink exact className="capitalize" activeClassName="active" to="/myfacts">my facts</NavLink>
      </nav>
    )
  }
}
