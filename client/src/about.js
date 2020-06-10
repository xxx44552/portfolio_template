import React, {useState, useEffect} from 'react';

export default function About() {

  const [data, setData] = useState(null);

  useEffect(()=> {
    fetch("/api/info")
        .then(response => response.json())
        .then(response => setData(response));
  }, []);

  return (
    <div className='about'>
      {data ? <h2>{data.adminTitle}</h2> : null}
      <hr />
      <img alt='Foto' className='ava' src={`${window.location.origin}/pic/ava`}/>
      <div className="about-text">
      {data ? <h2>{data.adminAbout}</h2> : null}
      </div>
    </div>
  )
};
