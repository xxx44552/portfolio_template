import {useState} from 'react'

export default function useFoto() {

  const [img, setImg] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    let image = e.target.files;

    //fix cancel file error
    if(image.length === 0) return;

    setFile(image[0]);
    if(image[0].type === 'image/jpeg' || image[0].type === 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(image[0]);
      reader.onload = (e) => {
        setError('');
        setImg(e.target.result);
      }
    }else {
      setError('Неверное расширение фото (jpeg, png)');
    }
  };

  return {
    onChange,
    img,
    error,
    file,
    setImg
  }
};
