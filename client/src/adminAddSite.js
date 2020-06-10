import React, {useState, useRef} from 'react';
import useFoto from "./customHooks/useFoto";

export default function AdminAddSite(props) {

  const {onChange, img, error, file} = useFoto();
  const token = localStorage.getItem('webinme');
  const [link, setLink] = useState('');
  const [text, setText] = useState('');
  const [dev, setDev] = useState('');
  const [errorFields, setErrorFields] = useState(null);

  const addSite = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('img', file);
    data.append('link', link);
    data.append('text', text);
    data.append('dev', dev);


    if(!link || !file || !text || !dev) {
      console.log(1)
      setErrorFields('Пустые поля');
      return
    }

    fetch('/sites', {
      method: 'post',
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(()=>console.log(data))
  };

  return (
    <form method='post' onSubmit={addSite} encType="multipart/form-data">
      <img  src={img} alt=""/>
      <p className='error'>{error}</p>
      <input name='img' onChange={onChange} type='file' /><br /> <span>Text</span>
      <textarea onChange={(e)=>setText(e.target.value)} value={text} name='name'></textarea><br /> <span>Link</span>
      <input onChange={(e)=>setLink(e.target.value)} value={link} name='link' type='text' /><br /> <span>Dev</span>
      <select onChange={(e)=>setDev(e.target.value)}>
        <option value='html'>html</option>
        <option value='js'>js</option>
        <option value='wordpress'>wordpress</option>
        <option value='react'>react</option>
        <option value='nodejs'>nodejs</option>
        <option value='mongodb'>mongodb</option>
      </select>
      {setErrorFields ? <p className='error'>{errorFields}</p> : null}
      <input type='submit' value='Отправить' />
    </form>
  )
};
