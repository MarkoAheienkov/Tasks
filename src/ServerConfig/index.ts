import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import path from 'path';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import articleRoutes from '../Routes/articles';
import postRoutes from '../Routes/posts';
import commentRoutes from '../Routes/comments';
import authRoutes from '../Routes/auth';

import errorHandler from '../ErrorHandler/errorHandler';
import passport from '../Passport';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use(passport.initialize());

app.use('/articles', articleRoutes);

app.use('/posts', postRoutes);

app.use('/comments', commentRoutes);

app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;
