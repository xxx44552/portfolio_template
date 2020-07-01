import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import './sass/reset.sass';
import './sass/style.sass';
import Sidebar from './sidebar';
import About from "./about";
import Info from './info';
import Works from './works';
import Sites from "./sites";
import Login from "./login";
import Admin from "./admin";
import mailIcon from './img/mail.svg'
import Feedback from "./feedback";
import CssEffects from "./components/cssEffects";
import Dragon from "./components/dragon";
import Reg from "./reg";

export default function App() {

  const [form, setForm] = useState(false);
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [dev, setDev] = useState();

  const update = (value) => {
    setDev(value);
    localStorage.setItem('dev', value);
  };

  const showForm = () => {
    setForm(!form);
  };

  useEffect(()=> {
    setDev(localStorage.getItem('dev'));
    fetch("/api/sites")
        .then(response => response.json())
        .then(response => setData(response));
    fetch("/api/info")
        .then(response => response.json())
        .then(data => {
          document.title = data.title;
          setInfo(data);
        })

  }, []);


  return (
      <BrowserRouter>
        <div className='wrapper'>
          <Dragon/>
          <CssEffects/>
          <Sidebar update={update}/>
          <div className="content">
            <Route exact={true} path='/' component={Info}/>
            <Route exact={true} path='/admin' component={Admin}/>
            <Route exact={true} path='/about' render={() =>
                <About data={info}/>
            }/>
            <Route exact={true} path='/reg' component={Reg}/>
            <Route exact={true} path='/works' render={()=>
                <Works update={update}/>
            }/>
            <Route exact={true} path='/works/all' render={()=>
                <div className='wrap-sites'>
                  <h2>Все</h2>
                  <div className='sites'>
                    {data.map(({link, text, dev, _id}, i) =>
                        <div className='site' key={i}>
                          <a href={link} target='_blank' rel="noopener noreferrer">{link}</a>
                          <span>{text}</span>
                          <picture>
                            <img src={`${window.location.origin}/pic/${_id}/image/`}/>
                          </picture>
                        </div>
                    )}
                  </div>
                </div>
            }/>
            <Route exact={true} path={'/works/'+dev} render={() =>
                <Sites data={data} dev={dev}/>
            }/>
            <Route exact={true} path={'/login'} render={() =>
                <Login/>
            }/>
          </div>
          <div className="feedback" title='Обратная связь' onClick={showForm}>
            <img src={mailIcon} alt='Обратная связь'/>
          </div>
          <Feedback show={form} showForm={showForm}/>
        </div>
      </BrowserRouter>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));

