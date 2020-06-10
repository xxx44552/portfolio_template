import React from 'react';
import logo from './img/logo.png'
import Filter from './filter'
import Nav from './nav'
import Social from './social'
import {NavLink} from "react-router-dom";

export default function Sidebar(props) {
  return (
    <div className='sidebar'>
      <NavLink to='/'>
        <div className="logo">
          <img className='logo-img' alt='logo' src={logo}/>
        </div>
      </NavLink>
      <div className='aside'>
        <Filter updateFilter={props.update} />
        <Nav/>
        <Social/>
      </div>
    </div>
  )
};
