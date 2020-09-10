import dotenv from 'dotenv';
import express from 'express';
import { api, views, home } from './routes';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', api);
app.use('/view', views);
app.use('/', home);

export default  app;
