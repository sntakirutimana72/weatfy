import dotenv from 'dotenv';
import path from 'path'
import express from 'express';
import { renderFile } from 'ejs'
import statics from './routes/static';
import dashboard from './routes/dashboard';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'views'));

app.use('/static', statics)
// app.use('/api', api);
// app.use('/view', views);
app.use('/', dashboard);

export default  app;
