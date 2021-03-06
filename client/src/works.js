import React from 'react';
import jsIcon from './img/js.svg'
import reactIcon from './img/react.svg'
import wordpressIcon from './img/wordpress.svg'
import nodejsIcon from './img/node.svg'
import mongodbIcon from './img/mongodb.svg'
import listIcon from './img/list.svg'
import {NavLink} from "react-router-dom";

export default function Works(props){
  return (
    <div className='works'>
      <NavLink to='/works/all' className="item html" title="All sites">
          <div className='nav-animation'><img alt='HTML' src={listIcon}/></div>
      </NavLink>
      <NavLink to='/works/js' className="item js" title='Sites with JS'>
        <div className='item-wrap' onClick={()=>{
          localStorage.setItem('dev', 'js')
          props.update('js')
        }}><div className='nav-animation'><img alt='HTML' src={jsIcon}/></div></div>
      </NavLink>
      <NavLink to='/works/react' className="item react" title="Sites with React">
        <div className='item-wrap' onClick={()=>{
          localStorage.setItem('dev', 'react')
          props.update('react')
        }}><div className='nav-animation'><img alt='HTML' src={reactIcon}/></div></div>
      </NavLink>
      <NavLink to='/works/wordpress' className="item wordpress" title='Sites with WordPress'>
        <div className='item-wrap' onClick={()=>{
          localStorage.setItem('dev', 'wordpress')
          props.update('wordpress')
        }}><div className='nav-animation'><img alt='HTML' src={wordpressIcon}/></div></div>
      </NavLink>
      <NavLink to='/works/nodejs' className="item nodejs" title='Sites with NodeJs'>
        <div className='item-wrap' onClick={()=>{
          localStorage.setItem('dev', 'nodejs')
          props.update('nodejs')
        }}><div className='nav-animation'><img alt='HTML' src={nodejsIcon}/></div></div>
      </NavLink>
      <NavLink to='/works/mongodb' className="item mongodb" title='Sites with MongoDB'>
        <div className='item-wrap' onClick={()=>{
          localStorage.setItem('dev', 'mongodb')
          props.update('mongodb')
        }}><div className='nav-animation'><img alt='HTML' src={mongodbIcon}/></div></div>
      </NavLink>
    </div>
  )
};
