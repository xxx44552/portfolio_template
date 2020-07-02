import React, {useState, useEffect} from 'react';
import AdminEditSite from "./adminEditSite";
import AdminAddSite from "./adminAddSite";
import AdminInfo from "./adminInfo";
import {useHistory} from 'react-router-dom';

export default function Admin() {

  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const history = useHistory();

  const getSites = () => {
    fetch('/api/sites')
      .then(response => response.json())
      .then(response => setData(response));
  }

  const getInfo = () => {
    fetch('/api/info')
      .then(response => response.json())
      .then(data => setInfo(data));
  };

  const logout = () => fetch('/logout').then(res => res.redirected && history.push('/login'));

  useEffect(function () {
    getSites();
    getInfo();
  }, []);

  function changeData(t){
    let newStateData = [...data].concat(t);
    setData(newStateData);
  }
  return (
    <React.Fragment>
      <div className='admin-wrap'>
        <input type='checkbox' id='flag' />
        <label htmlFor="flag" className='flag'></label>
        <div onClick={logout} className='logout'>Выйти</div>
        <div className='admin-scroll'>
          <div className="admin-list">
            <AdminAddSite func={changeData}/>
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
