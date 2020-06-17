import React, {useState} from 'react';
import useFoto from "./customHooks/useFoto";
import setSkills from "./customHooks/setSkills";

export default function AdminSite(props) {

  const {item, index} = props;
  const {addDevToArr, dev} = setSkills();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.text);
  const [link, setLink] = useState(item.link);
  const [showItem, setShowItem] = useState(true);

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
    }).then((res) => console.log(res))

  };

  const delSite = () => {
    console.log(props.item._id)
    fetch(`/delSite/${props.item._id}`, {
      method: 'delete',
    }).then(() => console.log('Удаление - ' + props.item._id));

    setShowItem(false)

  };

  return (
    <React.Fragment>
      {showItem &&
      <div className='site-list'>
        <span className='id'>{index}</span>
        <a className='link' href={item.link} target='_blank' rel="noopener noreferrer">{link || item.link.replace(/(^\w+:|^)\/\//, '')}</a>
        <span className='name'>{text || item.text}</span>
        <span className='dev'>{item.dev.map(el=>el) || dev.map(el => el)}===</span>
        <img className='img' src={img || `/pic/${item._id}/image`} alt={item.alt} />
        <span onClick={()=>{setEdit(true)}}>Изменить</span>
        {edit &&
        <form onSubmit={editSite} method="post" encType="multipart/form-data">
          <input name='image' onChange={onChange} type='file' /><br /> <span>Text</span>
          <textarea onChange={(e)=>setText(e.target.value)} name='name' defaultValue={item.text}></textarea><br />
          <span>Link</span>
          <input onChange={(e)=>setLink(e.target.value)} name='link' defaultValue={item.link} type='text' /><br />
          <span>Dev</span>
          <div className="radio-wrap">
            <input type='checkbox' onChange={addDevToArr} id={'radio-html' + index} value='html' defaultChecked/>
            <label htmlFor={'radio-html' + index}>html</label>
            <input type='checkbox' onChange={addDevToArr} id={'radio-js' + index} value='js'/>
            <label htmlFor={'radio-js' + index}>js</label>
            <input type='checkbox' onChange={addDevToArr} id={'radio-wordpress' + index} value='wordpress'/>
            <label htmlFor={'radio-wordpress' + index}>wordpress</label>
            <input type='checkbox' onChange={addDevToArr} id={'radio-react' + index} value='react'/>
            <label htmlFor={'radio-react' + index}>react</label>
            <input type='checkbox' onChange={addDevToArr} id={'radio-nodejs' + index} value='nodejs'/>
            <label htmlFor={'radio-nodejs' + index}>nodejs</label>
            <input type='checkbox' onChange={addDevToArr} id={'radio-mongodb' + index} value='mongodb'/>
            <label htmlFor={'radio-mongodb' + index}>mongodb</label>
          </div>
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
