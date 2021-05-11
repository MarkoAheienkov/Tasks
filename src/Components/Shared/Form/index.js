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
  *   },
  *   ...
  * }
*/
const Form = ({config, onSubmit, setConfigChange, children}) => {
  const inputNames = Object.keys(config);


  const onInputChange = (event) => {
    const {value, name} = event.target;
    const newConfig = {...config};
    newConfig[name] = {...newConfig[name]};
    newConfig[name].value = value;
    setConfigChange(newConfig);
  };

  const inputs = inputNames.map((inputName) => {
    const {placeholder, type, label, value} = config[inputName];
    return <Input
            onChange={onInputChange}
            key={inputName}
            name={inputName}
            placeholder={placeholder}
            type={type}
            label={label}
            value={value}/>;
  });


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
