import express from 'express';
import cors from 'cors';

import articleRoutes from './Routes/articles';
import postRoutes from './Routes/posts';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded());

app.use('/articles', articleRoutes);

app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log('Service is running on PORT:', PORT);
});
