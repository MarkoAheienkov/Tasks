import Toggle from '../../UI/Toggle';
import classes from './Header.module.css';
import Select from 'react-select';

const Header = ({toggleClick, onSelectChange}) => {
  const options = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' }
  ]
  
  return <>
    <header className={classes.Header}>
      <Toggle toggleClick={toggleClick}/>
      <Select  onChange={onSelectChange} className={classes.Select} options={options}/>
    </header>
  </>;
};

export default Header;
