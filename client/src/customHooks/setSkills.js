import {useState} from 'react'

export default function SetSkills() {

  const [dev, setDev] = useState(['html']);

  const addDevToArr = (e) => {
    const arr = dev;
    const el = e.target.value;
    if(e.target.checked) {
      const newArr = arr.concat(el);
      const unique = [...new Set(newArr)];
      setDev(unique);
    }
    if(!e.target.checked) {
      const newArr = arr.filter(el => el !== e.target.value)
      setDev(newArr);
    }
  }

  return {
    addDevToArr,
    dev
  }
};



