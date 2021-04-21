const path = require('path');
const BSTSortAndFind = require('./Classes/BSTSortAndFind');
const Program = require('./Classes/Program');

const PATH_TO_FILE = path.resolve(__dirname, 'Database', 'db.json');

const bstSortAndFind = new BSTSortAndFind();

const program = new Program(PATH_TO_FILE, bstSortAndFind);

program.main();
