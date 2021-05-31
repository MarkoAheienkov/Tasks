import express from 'express';
import cors from 'cors';

import articleRoutes from './Routes/articles';
import postRoutes from './Routes/posts';
import commentRoutes from './Routes/comments';

import errorHandler from './ErrorHandler/errorHandler';
import mongoConnector from './Connect/mongoDBConnector';
import serverErrorLogger from './Logger/ServerErrorLogger';

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
    await mongoConnector.getConnect();
    app.listen(PORT, () => {
      console.log('Server is running on PORT:', PORT);
    });
  } catch (err) {
    serverErrorLogger.log({
      level: 'error',
      message: err,
    });
  }
};

startServer();
