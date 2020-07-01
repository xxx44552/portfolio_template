import React, {useState, useEffect} from 'react';
import AdminEditSite from "./adminEditSite";
import AdminAddSite from "./adminAddSite";
import AdminInfo from "./adminInfo";

export default function Admin() {

  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);

  const getSites = () => {
    fetch('/api/sites')
      .then(response => response.json())
      .then(response => setData(response));
  }

  const getInfo = () => {
    fetch('/api/info')
      .then(response => response.json())
      .then(data => setInfo(data));
  }

  useEffect(function () {
    getSites();
    getInfo();
  }, []);

  function changeData(data = {}){
    let newStateData = data;
    newStateData.push(data);
    setData(newStateData);
  }
  return (
    <React.Fragment>
      <div className='admin-wrap'>
        <input type='checkbox' id='flag' />
        <label htmlFor="flag" className='flag'></label>
        <a href='/logout' className='logout'>Выйти</a>
        <div className='admin-scroll'>
          <div className="admin-list">
            <AdminAddSite onChange = {data => {changeData(data)}}/>
            {data.map((item, i) =>
               <AdminEditSite item={item} index={i+1} key={i} />
            )}
          </div>
        </div>
        <div className='admin-info'>
          <AdminInfo item={info} />
        </div>
      </div>
    </React.Fragment>
  )
}
