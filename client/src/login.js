import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import {useHistory} from 'react-router-dom';

export default function Login() {

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [cookies, setCookie] = useCookies(['jwt']);
  const history = useHistory();

  function auth(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'post',
      body: JSON.stringify({login, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data=>data.json())
      .then(data => {
        if(data.token) {
          setCookie('jwt', data.token, { path: '/' });
          history.push('/admin')
        }
        if(data.error){
          setLoginError(data.error)
        }
      })
  };

  return (
    <form onSubmit={auth} method='post' className='login'>
      <input type='text' onChange={e=>setLogin(e.target.value)} name='login' placeholder='Login'/>
      <input type='password' onChange={e=>setPassword(e.target.value)} name='password' placeholder='Password'/>
      <input type='submit'/>
      {loginError ? <p className='error'>{loginError}</p> : null}
    </form>
  )
}

