import React from 'react';

export default function Sites(props) {
  return (
    <div className='wrap-sites'>
      <h2>{props.dev || 'Все'}</h2>
      <div className='sites'>
        {props.data.map(({text, dev, link, _id}, i) =>
          dev === props.dev &&
          <div className='site' key={i}>
            <span>{text}</span>
            <a href={link} target='_blank' rel="noopener noreferrer">{link}</a>
            <picture>
              <img src={`${window.location.origin}/pic/${_id}`} alt='pic'/>
            </picture>
          </div>
        )}
      </div>
    </div>
  )
};
