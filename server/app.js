import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import database from './models';
import dotenv from 'dotenv';
import routes from './routes/';


dotenv.config();

const app = express();
let router = express.Router();
const port = process.env.PORT || 8001;


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

routes(router);
app.use('/api/v1', router);

app.get('/', (req, res) =>{
  res.status(200).send({
    Message: 'Welcome to more Recipes!'
  });
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