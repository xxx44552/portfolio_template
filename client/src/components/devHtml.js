import React from 'react';

export default function DevHtml(props) {
  const skills = ['html', 'js', 'wordpress', 'react', 'nodejs', 'mongodb'];

  const check = (skill) => {
    if(props.arr.includes(skill)) return true;
    else return false;
  };
  return(
    <div className="radio-wrap">
      {skills.map((el, i) => {
        return (
          <React.Fragment key={el}>
            <input type='checkbox'
                   onChange={e => props.func(e, props.arr)}
                   id={props.i ? 'radio-' + el + props.i : 'radio-' + el}
                   value={el}
                   defaultChecked={check(el)}
            />
            <label htmlFor={props.i ? 'radio-' + el + props.i : 'radio-'+el}>{el}</label>
          </React.Fragment>
        )
      })}
    </div>
  )
};
