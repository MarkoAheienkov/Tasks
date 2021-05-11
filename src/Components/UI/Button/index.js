import classes from './Button.module.css';

const Button = ({type, click, children, btnType}) => {
  const btnClasses = [classes.Button];
  switch(btnType) {
    case('inline-primary'):
      btnClasses.push(classes.InlinePrimary);
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
  return <button className={btnClasses.join(' ')} onClick={click} type={type}>{children}</button>
};

export default Button;
