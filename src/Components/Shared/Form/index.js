import Input from "../../UI/Inputs";

/* 
  * config - all inputs info
  * {
  *   inputName: {
  *     placeholder, - placeholder for input
  *     type, - type of input
  *     label, - label for input
  *     value, - value of input
  *     validators: [], - array of validators
  *     isValid: false, - isValid field
  *     isTouched: false, - isTouched field
  *     errors: [] - array of errors
  *   },
  *   ...
  * }
*/
const Form = ({config, onSubmit, setConfigChange, children, setIsValid, errors = [], onInput }) => {
  const inputNames = Object.keys(config);

  const validate = (inputName, config) => {
    const validators = config[inputName].validators;
    const value = config[inputName].value;
    let isValid = true;
    let errorText = '';
    for (let validator of validators) {
      const validInfo = validator(value)
      if (!validInfo.isValid) {
        isValid = validInfo.isValid;
        errorText = validInfo.error.errorMessage;
        break;
      }
      if (!config[inputName].isTocuhed) {
        isValid = validInfo.isValid;
        errorText = '';
      }
    }
    return {errorText, isValid};
  };

  const isValidForm = (config) => {
    let isValid = true;
    for (let inputName in config) {
      if (!config[inputName].isValid) {
        isValid =false;
        break;
      }
    }
    return isValid;
  };

  const onInputChange = (event) => {
    if (onInput) {
      onInput();
    }
    const {value, name} = event.target;
    const newConfig = {...config};
    newConfig[name] = {...newConfig[name]};
    newConfig[name].value = value;
    const {errors, isValid} = validate(name, newConfig);
    newConfig[name].isValid = isValid;
    newConfig[name].errors = errors;
    newConfig[name].isTocuhed = true;
    if (setIsValid) {
      setIsValid(isValidForm(newConfig));
    }
    setConfigChange(newConfig);
  };

  let inputs = inputNames.map((inputName) => {
    const {placeholder, type, label, value} = config[inputName];
    return <Input
            onChange={onInputChange}
            key={inputName}
            name={inputName}
            placeholder={placeholder}
            type={type}
            label={label}
            value={value}
            isValid={validate(inputName, config).isValid}
            errorText={validate(inputName, config).errorText}
            isTocuhed={config[inputName].isTocuhed}/>;
  });

  if (errors.length > 0) {
    inputs = inputNames.map((inputName) => {
      const {placeholder, type, label, value} = config[inputName];
      const findError = errors.find(({param}) => param === inputName);
      console.log(findError);
      return <Input
              onChange={onInputChange}
              key={inputName}
              name={inputName}
              placeholder={placeholder}
              type={type}
              label={label}
              value={value}
              isValid={findError ? false: true}
              errorText={findError ? findError.msg: ''}
              isTocuhed={config[inputName].isTocuhed}/>;
    });
  }

  const submitForm = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return <form onSubmit={submitForm}>
    {inputs}
    {children}
  </form>;
};

export default Form;
