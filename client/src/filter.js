import React from 'react';
import htmlIcon from './img/html.svg'
import jsIcon from './img/js.svg'
import reactIcon from './img/react.svg'
import wordpressIcon from './img/wordpress.svg'
import nodeIcon from './img/node.svg'
import mongoIcon from './img/mongodb.svg'
import {NavLink} from "react-router-dom";

export default function Filter(props) {
  return (
    <div className='filters'>
      <NavLink to='/works/all' className={'html filter-nav'}>
        <div title={'Все'} className='filter-wrap'><img alt='HTML' src={htmlIcon}/></div>
      </NavLink>
      <NavLink to='/works/js' className={'js filter-nav'}>
        <div title={'Js'}  className='filter-wrap' onClick={()=> props.updateFilter('js')}><img alt='JavaScript' src={jsIcon}/></div>
      </NavLink>
      <NavLink to='/works/react' className={'react filter-nav'}>
        <div title={'React'}  className='filter-wrap' onClick={()=> props.updateFilter('react')}><img alt='React' src={reactIcon}/></div>
      </NavLink>
      <NavLink to='/works/wordpress' className={'wordpress filter-nav'}>
        <div title={'WordPress'}  className='filter-wrap' onClick={()=> props.updateFilter('wordpress')}><img alt='WordPress' src={wordpressIcon}/></div>
      </NavLink>
      <NavLink to='/works/nodejs' className={'nodejs filter-nav'}>
        <div title={'Nodejs'}  className='filter-wrap' onClick={()=> props.updateFilter('nodejs')}><img alt='Nodejs' src={nodeIcon}/></div>
      </NavLink>
      <NavLink to='/works/mongodb' className={'mongodb filter-nav'}>
        <div title={'Mongodb'}  className='filter-wrap' onClick={()=> props.updateFilter('mongodb')}><img alt='MongoDB' src={mongoIcon}/></div>
      </NavLink>
    </div>
  )
};
