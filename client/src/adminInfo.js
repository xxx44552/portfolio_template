import React, {useState} from 'react';
import useFoto from './customHooks/useFoto'

export default function AdminInfo(props) {

  const [adminName, setAdminName] = useState(null);
  const [adminProf, setAdminProf] = useState(null);
  const [adminTitle, setAdminTitle] = useState(null);
  const [adminText, setAdminText] = useState(null);
  const [adminAbout, setAdminAbout] = useState(null);
  const [title, setTitle] = useState("Titlee");
  const {onChange, file, img, error} = useFoto();

  const editInfo = (e) => {
    e.preventDefault();
    const data = new FormData();
    if(file) data.append('image', file);
    if(adminName) data.append('adminName', adminName);
    if(title) data.append('title', title);
    if(adminProf) data.append('adminProf', adminProf);
    if(adminTitle) data.append('adminTitle', adminTitle);
    if(adminText) data.append('adminText', adminText);
    if(adminAbout) data.append('adminAbout', adminAbout);


    fetch(`/info`, {
      method: 'post',
      body: data
    }).then((res) => res.json()).then(data => console.log(data))
  }

  const {item} = props;

  return (
    <form method="post" encType="multipart/form-data" onSubmit={editInfo} className='info-form'>
      <div><span>Title: </span><input onChange={(e)=>setTitle(e.target.value)} type='text' defaultValue={item.title} name='title' /></div>
      <div><span>Имя: </span><input onChange={(e)=>setAdminName(e.target.value)} type='text' defaultValue={item.adminName} name='adminName' /></div>
      <div><span>Специализация: </span><input onChange={(e)=>setAdminProf(e.target.value)} type='text' defaultValue={item.adminProf} name='adminProf' /></div>
      <div><span>Admin title: </span><input onChange={(e)=>setAdminTitle(e.target.value)} type='text' defaultValue={item.adminTitle} name='adminTitle' /></div>
      <div><span>Admin text: </span><textarea onChange={(e)=>setAdminText(e.target.value)} defaultValue={item.adminText} name='adminText'></textarea></div>
      <div><span>Admin about: </span><textarea onChange={(e)=>setAdminAbout(e.target.value)} defaultValue={item.adminAbout} name='adminAbout'></textarea></div>
      <div>
        <span>Logo: </span>
        <img alt='' className='admin-ava' src={img || `/pic/ava`} />
        <p className='error'>{error}</p>
        <input type='file' onChange={onChange} name='image' />
      </div>
      <input type='submit'  value='Сохранить' />
    </form>
  )
};
