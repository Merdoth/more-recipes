import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import database from './models';
import dotenv from 'dotenv';
import routes from './routes/';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';


dotenv.config();

const app = express();
let router = express.Router();
const port = process.env.PORT || 9000;


app.use(logger('dev'));
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

routes(router);
app.use('/api/v1', router);

app.get('/* ', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

database.sequelize.authenticate()
  .then(() => { app.listen(port, (err) => {
    if (!err) {
      console.log(`listening on port localhost://${port}`);
    }
  });
  console.log('Datbase Connection established');
  })
  .catch(err => {
    console.log('Could not establish a database connection', err);
  });

export default app;