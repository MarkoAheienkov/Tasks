import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import articleRoutes from './Routes/articles';
import postRoutes from './Routes/posts';
import commentRoutes from './Routes/comments';

import errorHandler from './ErrorHandler/errorHandler';
// import sqlConnector from './Connect/sqlDBConnector';
import serverErrorLogger from './Logger/ServerErrorLogger';
// import createTables from './Init';
import typeORMConnector from './Connect/typeORMConnect';
import createErrorMessage from './Helpers/createErrorMessage';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use('/articles', articleRoutes);

app.use('/posts', postRoutes);

app.use('/comments', commentRoutes);

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    // await sqlConnector.getConnect();
    // await createTables();
    await typeORMConnector.getConnect();
    app.listen(PORT, () => {
      console.log('Server is running on PORT:', PORT);
    });
  } catch (err) {
    serverErrorLogger.log({
      level: 'error',
      message: createErrorMessage(err),
    });
  }
};

startServer();
