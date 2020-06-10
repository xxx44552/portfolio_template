import React, {useState, useEffect} from 'react';
import AdminSite from "./adminSite";
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
    fetch('/info')
      .then(response => response.json())
      .then(response => setInfo(response));
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
               <AdminSite item={item} index={i+1} key={i} />
            )}
          </div>
        </div>
        <div className='admin-info'>
          {/*{info.map((item, i) =>*/}
          {/*    <AdminInfo item={item} key={i} />*/}
          {/*)}*/}
          <AdminInfo item={info} />
        </div>
      </div>
    </React.Fragment>
  )
}
