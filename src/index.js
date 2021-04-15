import './index.css';

import './Components/Grid';
import './Components/Row';
import './Components/Tooltip';

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fillGrid = async () => {
  const data = await getData('http://localhost:3000/posts');
  const grid = document.getElementById('user-grid');
  grid.setData(data);
  document.body.append(grid);
};

fillGrid();
