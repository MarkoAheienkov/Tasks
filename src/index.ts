import express from 'express';
import cors from 'cors';

import articleRoutes from './Routes/articles';
import postRoutes from './Routes/posts';
import commentRoutes from './Routes/comments';

import errorHandler from './ErrorHandler/errorHandler';
import { connect } from './Connect/mongoDBConnector';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use(errorHandler);

app.use('/articles', articleRoutes);

app.use('/posts', postRoutes);

app.use('/comments', commentRoutes);

const startServer = async (): Promise<void> => {
  await connect('mongodb://localhost:27017/forum');
  app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
  });
};

startServer();
