const path = require('path');
const Program = require('../../Classes/WriteProgram');
const {FileSystemWriter} = require('../../Classes/FileSystemJSON');

const REQUESTS_PER_DAY = 1;

const ACCESS_KEY = '3e0a35b684d94cb02fb32974d52f0a2d';
const url = `http://api.aviationstack.com/v1/flights?access_key=${ACCESS_KEY}&limit=100`;
const PATH_TO_FILE = path.resolve(__dirname, '..', '..', 'Database', 'db.json');

const mapResponses = (responces) => {
  return responces.map((responce) => responce.data).flat();
};

const program = new Program(PATH_TO_FILE, url, REQUESTS_PER_DAY, FileSystemWriter, mapResponses, 'offset');

program.main();
