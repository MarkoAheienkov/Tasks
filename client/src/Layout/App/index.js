import { Route } from 'react-router';
import Chat from '../Chat';
import Login from '../Login';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Login}/>
      <Route exact path='/chat' component={Chat}/>
    </div>
  );
}

export default App;
