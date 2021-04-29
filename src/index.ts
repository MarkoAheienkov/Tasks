import express from 'express';
import cors from 'cors';

import articleRoutes from './Routes/articles';
import postRoutes from './Routes/posts';

import errorHandler from './ErrorHandler/errorHandler';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded());

app.use('/articles', articleRoutes);

app.use('/posts', postRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Service is running on PORT:', PORT);
});
