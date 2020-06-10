import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {NavLink} from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navigation">
      <NavLink className='link' exact={true} to="/"><i className="fa fa-home" aria-hidden="true"></i>Home</NavLink>
      <NavLink className='link' exact={true} to="/works"><i className="fa fa-code" aria-hidden="true"></i>Work</NavLink>
      <NavLink className='link' exact={true} to="/about"><i className="fa fa-user" aria-hidden="true"></i>About</NavLink>
    </nav>
  )
};

