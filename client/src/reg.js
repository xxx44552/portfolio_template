import React, {useState, useEffect} from 'react';

export default function Reg() {

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [data, setData] = useState([]);

  function reg(e) {
    e.preventDefault();
    fetch('/reg', {
      method: 'post',
      body: JSON.stringify({login, password, email}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
      .then(token => token.token ? localStorage.setItem('webinme', token.token) : console.log("err"))
      .catch(e => console.log(e))
  }

  useEffect(()=> {
    fetch('/api').then(data=>data.json()).then(sites => {
      setData(sites)

    })

  }, [0]);

  return (
      <form method='post' onSubmit={reg} className='reg'>
        <input type='text' onChange={e=>setLogin(e.target.value)} name='login' placeholder='Login'/>
        <input type='email' onChange={e=>setEmail(e.target.value)} name='email' placeholder='Email'/>
        <input type='password' onChange={e=>setPassword(e.target.value)} name='password' placeholder='Password'/>
        <input type='submit' value='Регистрация'/>
        {data.map(el=>{
          return <img src={`/api/${el._id}/image`} />
        })}
      </form>
  )
}

