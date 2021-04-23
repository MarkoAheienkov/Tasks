const path = require('path');
const BSTSortAndFind = require('../../Classes/BSTSortAndFind');
const IBLSortAndFind = require('../../Classes/IBLSortAndFind');
const Logger = require('../../Classes/Logger');
const {FileSystemReader} = require('../../Classes/FileSystemJSON');
const MQBSortAndFind = require('../../Classes/MQBSortAndFind');
const Program = require('../../Classes/Program');

const PATH_TO_FILE = path.resolve(__dirname, '..', '..', 'Database', 'db.json');

const bstSortAndFind = new BSTSortAndFind();
const iblSortAndFind = new IBLSortAndFind();
const mqbSortAndFind = new MQBSortAndFind();

const logger = new Logger();

const program = new Program(PATH_TO_FILE, bstSortAndFind, logger, FileSystemReader);

program.main();
