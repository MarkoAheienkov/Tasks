const getValueFromSelector = (value, selector) => {
  if (!selector) {
    return value;
  }
  const fields = selector.split('.');
  return fields.reduce((value, field) => {
    let newValue = value[field];
    if (!isNaN(newValue)) {
      newValue = parseInt(newValue);
    }
    return newValue;
  }, value);
};

const comparator = (order, val1, val2) => {
  if (order === -1) {
    return val1 > val2;
  } else {
    return val1 < val2;
  }
};

module.exports = {
  getValueFromSelector,
  comparator,
};
