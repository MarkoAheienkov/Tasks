const addZero = (num) => {
  let result = num;
  if (num < 10) {
    result = '0' + num;
  }
  return result;
};

export default addZero;
