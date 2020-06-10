import React, {useState} from 'react';
import useFoto from "./customHooks/useFoto";

export default function AdminSite(props) {

  const {item, index} = props;

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.text);
  const [link, setLink] = useState(item.link);
  const [dev, setDev] = useState(item.dev);
  const [showItem, setShowItem] = useState(true);
  const token = localStorage.getItem('webinme');

  const {onChange, file, img, error} = useFoto();

  const editSite = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', file);
    data.append('link', link);
    data.append('text', text);
    data.append('dev', dev);


    fetch(`/editSite/${props.item._id}`, {
      method: 'post',
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => console.log(res))

  };

  const delSite = () => {
    console.log(props.item._id)
    fetch(`/delSite/${props.item._id}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => console.log('Удаление - ' + props.item._id));

    setShowItem(false)

  };

  return (
    <React.Fragment>
      {showItem &&
      <div className='site-list'>
        <span className='id'>{index}</span>
        <a className='link' href={item.link} target='_blank' rel="noopener noreferrer">{link || item.link.replace(/(^\w+:|^)\/\//, '')}</a>
        <span className='name'>{text || item.text}</span> <span className='dev'>{dev || item.dev}</span>
        <img className='img' src={img || `/pic/${item._id}/image`} alt={item.alt} />
        <span onClick={()=>{setEdit(true)}}>Изменить</span>
        {edit &&
        <form onSubmit={editSite} method="post" encType="multipart/form-data">
          <input name='image' onChange={onChange} type='file' /><br /> <span>Text</span>
          <textarea onChange={(e)=>setText(e.target.value)} name='name' defaultValue={item.text}></textarea><br />
          <span>Link</span>
          <input onChange={(e)=>setLink(e.target.value)} name='link' defaultValue={item.link} type='text' /><br />
          <span>Dev</span>
          <select onChange={(e)=>setDev(e.target.value)} defaultValue={item.dev}>
            <option value='html'>html</option>
            <option value='js'>js</option>
            <option value='wordpress'>wordpress</option>
            <option value='react'>react</option>
            <option value='nodejs'>nodejs</option>
            <option value='mongodb'>mongodb</option>
          </select>
          <p className='error'>{error}</p>
          <div className='del-btn' onClick={delSite}>Удалить</div>
          <input type='submit' value='Сохранить' />
          <div className="close-edit" onClick={()=>{setEdit(false)}}>Закрыть</div>
        </form>}
      </div>
      }
    </React.Fragment>
  )
};
