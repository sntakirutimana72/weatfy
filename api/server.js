import dotenv from 'dotenv';
import express from 'express';
import { renderFile } from 'ejs'
import { serve_api, home, serve_static } from './routes';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use('/static', serveStatic)
app.use('/api', api);
app.use('/view', views);
app.use('/', home);

export default  app;
