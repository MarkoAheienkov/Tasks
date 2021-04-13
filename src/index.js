import './index.css';

import Grid from './Components/Grid';
import Row from './Components/Row';

customElements.define('user-grid', Grid);
customElements.define('user-row', Row);

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fillGrid = async () => {
  const data = await getData('https://jsonplaceholder.typicode.com/posts');
  const grid = document.getElementById('user-grid');
  grid.setData(data);
  document.body.append(grid);
};

fillGrid();
