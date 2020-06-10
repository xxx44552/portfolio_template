import React, {useState, useEffect} from 'react';
import Items from './items';
import Item from './item';

export default function Info() {

  const [data, setData] = useState(null);

  useEffect(()=> {
    fetch("/api/info")
      .then(response => response.json())
      .then(response => setData(response));
  }, []);

  return (
    <div className='box'>
      <div className="text">
        {data ?
          <>
            <h1>{data.adminName}</h1>
            <h2>{data.adminProf}</h2>
            <p>{data.adminText}</p>
          </>
         : null}
      </div>
      <div className="square">
          {Items.map(({www, link, alt}, i) =>
              <Item key={i} www={www} link={require(`${link}`)} alt={alt} i={i}/>
          )}
      </div>
    </div>
  )
};
