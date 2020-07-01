import React from 'react';

export default function About(props) {

  return (
    <div className='about'>
      <h2>{props.data.adminTitle}</h2>
      <hr />
      <img alt='Foto' className='ava' src={`${window.location.origin}/pic/ava`}/>
      <div className="about-text">
      <h2>{props.data.adminAbout}</h2>
      </div>
    </div>
  )
};
