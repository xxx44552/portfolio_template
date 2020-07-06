import React, {useState} from 'react';
import useFoto from "./customHooks/useFoto";
import setSkills from "./customHooks/setSkills";
import DevHtml from "./components/devHtml";

export default function AdminAddSite(props) {

  const {onChange, img, error, file, setImg} = useFoto();
  const {addDevToArr, dev} = setSkills();
  const [link, setLink] = useState('');
  const [text, setText] = useState('');
  const [errorFields, setErrorFields] = useState(null);

  const addSite = (e) => {
    e.preventDefault();
    const formEl = e.target;
    const data = new FormData();
    data.append('img', file);
    data.append('link', link);
    data.append('text', text);
    data.append('dev', dev);

    console.log(e.target)


    if(!link || !file || !text || !dev) {
      setErrorFields('Пустые поля ');
      return
    }

    fetch('/sites', {
      method: 'post',
      body: data,
    }).then(res => res.json())
      .then(data => {
        props.func(data);
        setImg(null)
        formEl.reset()
      })

  };

  return (
    <form method='post' onSubmit={addSite} encType="multipart/form-data">
      <img  src={img} className='add-site-img' alt=""/>
      <p className='error'>{error}</p>
      <input name='img' onChange={onChange} type='file' /><br /> <span>Text</span>
      <textarea onChange={(e)=>setText(e.target.value)}  name='name'></textarea><br /> <span>Link</span>
      <input onChange={(e)=>setLink(e.target.value)}  name='link' type='text' /><br /> <span>Dev</span>
      <DevHtml func={addDevToArr} arr={['html']}/>
      {setErrorFields ? <p className='error'>{errorFields}</p> : null}
      <input type='submit' value='Отправить' />
    </form>
  )
};
