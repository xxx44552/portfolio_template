import React from 'react';

export default function Sites(props) {
  return (
    <div className='wrap-sites'>
      <h2>{props.dev || 'Все'}</h2>
      <div className='sites'>
        {props.data.map(({text, dev, link, _id}, i) =>
          dev.join().split(',').includes(props.dev) &&
          <div className='site' key={i}>
            {console.log(dev)}
            <span>{text}</span>
            <a href={link} target='_blank' rel="noopener noreferrer">{link}</a>
            <picture>
              <img src={`${window.location.origin}/pic/${_id}/image`} alt='pic'/>
            </picture>
          </div>
        )}
      </div>
    </div>
  )
};
