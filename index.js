const path = require('path');
const Program = require('./Classes/Program');

const PATH_TO_FILE = path.resolve(__dirname, 'Database', 'db.json');

const program = new Program(PATH_TO_FILE);

program.main();
