import classes from './Backdrop.module.css';

const Backdrop = ({click, isVisible}) => {
  const backDropClasses = [classes.Backdrop];
  if (isVisible) {
    backDropClasses.push(classes.Show);
  }
  return <div onClick={click} className={backDropClasses.join(' ')}></div>;
};

export default Backdrop;
