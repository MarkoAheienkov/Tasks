const path = require('path');
const fetch = require('node-fetch');
const {FileSystemWriter} = require('../../Classes/FileSystemJSON');

const REQUESTS_PER_DAY = 1;

const ACCESS_KEY = '3e0a35b684d94cb02fb32974d52f0a2d';

const PATH_TO_FILE = path.resolve(__dirname, '..', '..', 'Database', 'db.json');

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const getDataAndWriteIt = async () => {
  const dataPromises = [];

  for (let i = 0; i < REQUESTS_PER_DAY; i++) {
    dataPromises.push(getData(
        `http://api.aviationstack.com/v1/flights?access_key=${ACCESS_KEY}&limit=100&offset=${i}`,
    ));
  }

  const responces = await Promise.all(dataPromises);

  const mapData = responces.map((responce) => responce.data).flat();

  await FileSystemWriter.write(PATH_TO_FILE, mapData);
};

getDataAndWriteIt();
