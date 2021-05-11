import classes from './Toggle.module.css';

const Toggle = ({toggleClick}) => {
  return <>
    <button onClick={toggleClick} className={classes.Toggle}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  </>;
};

export default Toggle;
