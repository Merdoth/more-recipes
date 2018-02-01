import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import expressValidator from 'express-validator';

import database from './models';
import routes from './routes/';
import webpackConfig from '../webpack.config.dev';

dotenv.config();
const indexPath = process.env.NODE_ENV === 'production' ? 'dist' : 'client';

const app = express();
const router = express.Router();
const port = process.env.PORT || 9000;
const compiler = webpack(webpackConfig);

app.use(logger('dev'));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, './../dist')));
}

if (process.env.NODE_ENV === 'production') {
  console.log('production');
}
if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressValidator());

routes(router);

app.use('/api/v1', router);

app.use('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `../${indexPath}/index.html`));
});

database.sequelize
  .authenticate()
  .then(() => {
    app.listen(port, (err) => {
      if (!err) {
        console.log(`listening on port localhost:${port}`);
      }
    });
    console.log('Datbase Connection established');
  })
  .catch((err) => {
    console.log('Could not establish a database connection', err);
  });

export default app;
