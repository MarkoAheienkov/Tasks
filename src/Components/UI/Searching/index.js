import classes from "./Searching.module.css";

const Searching = ({ search, delay = 500, placeholder }) => {
  let timerId;
  const onInput = (event) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      console.log(timerId);
      search(event.target.value);
    }, delay);
  };
  return <input placeholder={placeholder} className={classes.Searching} onInput={onInput}/>;
};

export default Searching;
