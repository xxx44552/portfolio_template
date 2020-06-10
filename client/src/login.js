import React, {useState} from 'react';

export default function Login() {

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  function auth(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'post',
      body: JSON.stringify({login, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data=>data.json()).then(token => token.token ? localStorage.setItem('webinme', token.token) : console.log("err"))
  };

  return (
    <form onSubmit={auth} method='post' className='login'>
      <input type='text' onChange={e=>setLogin(e.target.value)} name='login' placeholder='Login'/>
      <input type='password' onChange={e=>setPassword(e.target.value)} name='password' placeholder='Password'/>
      <input type='submit'/>
    </form>
  )
}

