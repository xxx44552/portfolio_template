import React, {useState} from 'react';
import {bear, bearHands} from "./components/bear";
import './sass/svg-animation.css';

export default function Feedback(props) {

    const [fbName, setFbName] = useState('');
    const [fbEmail, setFbEmail] = useState('');
    const [fbMess, setFbMess] = useState('');
    const [status, setStatus] = useState(false);
    const [errName, setErrName] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errMess, setErrMess] = useState(false);
    const [sendLoader, setSendLoader] = useState(false);

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const validation = () => {

      let errName = false;
      let errMess = false;
      let errEmail = false;

      if(fbName.length <= 3) {
        setErrName(true);
        errName = true;
      }else {
        setErrName(false);
      }

      if(fbMess.length <= 10) {
        setErrMess(true);
        errMess = true;
      }else {
        setErrMess(false);
      }

      if(!validateEmail(fbEmail)) {
        setErrEmail(true);
        errEmail = true;
      }else {
        setErrEmail(false);
      }

      if(errName || errMess || errEmail) {
        return true;
      }

      setSendLoader(true);

      return false;

    };

    const sendForm = (e) => {
    e.preventDefault();

    if(validation()) {
      return;
    };

    const form = {
      fbName: fbName,
      fbEmail: fbEmail,
      fbMess: fbMess
    };


    fetch('/mail', {
      method: 'post',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setStatus(true);
      console.log(JSON.stringify(form))
    })
  };

    return (
      props.show &&
      <div className='wrap-form'>
        <form action='/mail' method='post' className={sendLoader ? 'form MochiBox hide-bear': 'form MochiBox'} name='feedback'>
          <div className="anim-wrap">
            {
              status ?
                  <p>Сообщение отправлено</p>
                  :
                  <>
                    <h2>Feedback</h2>
                    <div className="section">
                      {errName ? <span className='error'>Введите больше 3 символов</span> : false}
                      <input type='text' onChange={(e)=> setFbName(e.target.value)} name='fbName' placeholder='Name' required/>
                    </div>
                    <div className="section">
                      {errEmail ? <span className='error'>Неверная почта</span> : false}
                      <input type='email' onChange={(e)=> setFbEmail(e.target.value)} name='fbEmail' placeholder='Email' required/>
                    </div>
                    <div className="section">
                      {errMess ? <span className='error'>Введите больше 10 символов</span> : false}
                      <textarea placeholder='Message' onChange={(e)=> setFbMess(e.target.value)} name='fbMess' required></textarea>
                    </div>
                    {
                      sendLoader ?
                          <p style={{'textAlign': 'right'}}>Отправка...</p>
                          :
                          <input type='submit' id='send' value='Send' onClick={sendForm}/>
                    }
                  </>
            }
            <div className='close-form' onClick={props.showForm}>&#215;</div>
          </div>
          {bear}
          {bearHands}
        </form>
      </div>
    )
}
