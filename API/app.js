const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const errorHandlerMiddleware = require('./Middlewares/errorHandler');

const postRouter = require('./Routes/posts');

app.use(cors());
app.use(helmet());

app.use('/posts', postRouter);

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log(`Server is running on port: 3000`);
});
