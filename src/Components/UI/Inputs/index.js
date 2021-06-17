import classes from './Input.module.css';

const Input = ({type, label, name, placeholder, onChange, value='', id=name, isValid = true, errorText = '', isTocuhed = false}) => {
  let element;
  const inputClasses = [];
  const formControllerClasses = [classes.FormControl];
  if (!isValid) {
    formControllerClasses.push(classes.PaddingBottomZero);
  }
  if (!isValid && isTocuhed) {
    formControllerClasses.push(classes.Error);
  }
  switch(type) {
    case('email'):
      inputClasses.push(classes.Input);
      element = <input className={inputClasses.join(' ')} value={value} onChange={onChange} type='email' id={id} placeholder={placeholder} name={name}/>;
      break;
    case('text'):
    inputClasses.push(classes.Input);
      element = <input className={inputClasses.join(' ')} value={value} onChange={onChange} type='text' id={id} placeholder={placeholder} name={name}/>;
      break;
    case('password'):
    inputClasses.push(classes.Input);
      element = <input className={inputClasses.join(' ')} value={value} onChange={onChange} type='password' id={id} placeholder={placeholder} name={name}/>;
      break;
    case('textarea'):
    inputClasses.push(classes.Textarea);
      element = <textarea className={inputClasses.join(' ')} value={value} onChange={onChange} id={id} placeholder={placeholder} name={name}/>;
      break;
    default:
      inputClasses.push(classes.Input);
      element = <input className={inputClasses.join(' ')} value={value} onChange={onChange} id={id} type='text' placeholder={placeholder} name={name}/>;
      break;
  }
  return <div className={formControllerClasses.join(' ')}>
    <label className={classes.Label} htmlFor={name}>
      {label}
    </label>
    {element}
    {
      !isValid && isTocuhed?
      <small className={classes.ErrorText}>{errorText}</small>:
      <small className={classes.Text}>&empty;</small>
    }
  </div>;
};

export default Input;
