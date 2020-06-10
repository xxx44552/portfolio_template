import React from 'react';

export default function Item(props) {
  return (
    <div className='item' style={{animationDelay: `${1+((props.i)/2)}s`}}>
      <img className='item-icon' style={{animationDelay: `${(props.i)/2}s`}} alt={props.alt} src={props.link}/>
    </div>
  )
}

