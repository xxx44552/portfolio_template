import {useState} from 'react'

export default function SetSkills() {

  const [dev, setDev] = useState(['html']);

  const addDevToArr = (e, data) => {
    const arr = dev;
    const el = e.target.value;
    if(e.target.checked) {
      const newArr = arr.concat(el).concat(data).filter(el => el !== '');
      const unique = [...new Set(newArr)];
      setDev(unique);
    }
    if(!e.target.checked) {
      const concatArr = [...arr, ...data].filter(el => el !== e.target.value).filter(el => el !== '');
      const newArr = [...new Set(concatArr)];
      setDev(newArr);
    }
  };

  return {
    addDevToArr,
    dev
  }
};



