import classes from './Input.module.css';

const Input = ({type, label, name, placeholder, onChange, value='', id=name}) => {
  let element;
  switch(type) {
    case('email'):
      element = <input className={classes.Input} value={value} onChange={onChange} type='email' id={id} placeholder={placeholder} name={name}/>;
      break;
    case('text'):
      element = <input className={classes.Input} value={value} onChange={onChange} type='text' id={id} placeholder={placeholder} name={name}/>;
      break;
    case('textarea'):
      element = <textarea className={classes.Textarea} value={value} onChange={onChange} id={id} placeholder={placeholder} name={name}/>;
      break;
    default:
      element = <input className={classes.Input} value={value} onChange={onChange} id={id} type='text' placeholder={placeholder} name={name}/>;
      break;
  }
  return <div className={classes.FormControl}>
    <label className={classes.Label} htmlFor={name}>
      {label}
    </label>
    {element}
  </div>;
};

export default Input;
