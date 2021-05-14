const addDelay = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      console.log(1);
      func(...args);
    }, delay);
  };
};

export default addDelay;
