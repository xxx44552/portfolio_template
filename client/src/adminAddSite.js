import React, {useState} from 'react';
import useFoto from "./customHooks/useFoto";
import setSkills from "./customHooks/setSkills";

export default function AdminAddSite(props) {

  const {onChange, img, error, file} = useFoto();
  const {addDevToArr, dev} = setSkills();
  const [link, setLink] = useState('');
  const [text, setText] = useState('');
  const [errorFields, setErrorFields] = useState(null);

  const addSite = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('img', file);
    data.append('link', link);
    data.append('text', text);
    data.append('dev', dev);


    if(!link || !file || !text || !dev) {
      setErrorFields('Пустые поля');
      return
    }

    fetch('/sites', {
      method: 'post',
      body: data,
    }).then(res => res.json())
      .then(data => {
        if(data.error) {
          console.log(data.error)
        }
      })
  };

  return (
    <form method='post' onSubmit={addSite} encType="multipart/form-data">
      <img  src={img} className='add-site-img' alt=""/>
      <p className='error'>{error}</p>
      <input name='img' onChange={onChange} type='file' /><br /> <span>Text</span>
      <textarea onChange={(e)=>setText(e.target.value)} value={text} name='name'></textarea><br /> <span>Link</span>
      <input onChange={(e)=>setLink(e.target.value)} value={link} name='link' type='text' /><br /> <span>Dev</span>
      <div className="radio-wrap">
        <input type='checkbox' onChange={addDevToArr} id='radio-html' value='html' defaultChecked/>
        <label htmlFor='radio-html'>html</label>
        <input type='checkbox' onChange={addDevToArr} id='radio-js' value='js'/>
        <label htmlFor='radio-js'>js</label>
        <input type='checkbox' onChange={addDevToArr} id='radio-wordpress' value='wordpress'/>
        <label htmlFor='radio-wordpress'>wordpress</label>
        <input type='checkbox' onChange={addDevToArr} id='radio-react' value='react'/>
        <label htmlFor='radio-react'>react</label>
        <input type='checkbox' onChange={addDevToArr} id='radio-nodejs' value='nodejs'/>
        <label htmlFor='radio-nodejs'>nodejs</label>
        <input type='checkbox' onChange={addDevToArr} id='radio-mongodb' value='mongodb'/>
        <label htmlFor='radio-mongodb'>mongodb</label>
      </div>
      {setErrorFields ? <p className='error'>{errorFields}</p> : null}
      <input type='submit' value='Отправить' />
    </form>
  )
};
