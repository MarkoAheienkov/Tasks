import './index.css';

import './Components/Grid';
import './Components/Row';
import './Components/Tooltip';
import './Components/Pagination';

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getQueryValues = () => {
  let queryValues = location.search.split('?')[1];
  if (queryValues) {
    queryValues = queryValues.split('&')
        .reduce((queries, query) => {
          const [name, value] = query.split('=');
          queries[name] = value;
          return queries;
        }, {});
  }
  return queryValues;
};

const getCurrentPage = () => {
  const queries = getQueryValues();
  return queries ? queries.page : 1;
};

const initPagination = async (limitForPage, currentPage) => {
  const {count} = await getData('http://localhost:3000/posts/count');
  const pagination = document.getElementById('pagination');
  pagination.count = Math.ceil(count/limitForPage);
  pagination.active = currentPage;
  pagination.addEventListener('pageclick', (event) => {
    const url = `http://localhost:3000/posts?limit=${limitForPage}&page=${event.number}`;
    fillGrid(url);
  });
};

const fillGrid = async (url) => {
  const data = await getData(url);
  const grid = document.getElementById('user-grid');
  grid.setData(data);
};

window.addEventListener('load', async () => {
  const LIMIT_FOR_PAGE = 15;
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('./sw.bundle.js');
  }
  const page = getCurrentPage();
  fillGrid(`http://localhost:3000/posts?limit=${LIMIT_FOR_PAGE}&page=${page}`);
  initPagination(LIMIT_FOR_PAGE, page);
});

