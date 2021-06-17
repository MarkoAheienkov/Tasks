import classes from './Button.module.css';

const Button = ({type, click, children, btnType, disabled = false, }) => {
  const btnClasses = [classes.Button];
  switch(btnType) {
    case('inline-primary'):
      btnClasses.push(classes.InlinePrimary);
      break;
    case('inline-primary white'):
      btnClasses.push(classes.InlinePrimary);
      btnClasses.push(classes.White);
      break;
    case('primary'):
      btnClasses.push(classes.Primary);
      break;
    case('warn'):
      btnClasses.push(classes.Warn);
      break;
    case('success'):
      btnClasses.push(classes.Success);
      break;
    case('danger'):
      btnClasses.push(classes.Danger);
      break;
    default:
      break;
  }
  return <button disabled={disabled} className={btnClasses.join(' ')} onClick={click} type={type}>{children}</button>
};

export default Button;
