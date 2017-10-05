import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import database from './models';
import dotenv from 'dotenv';
import recipes from './routes/recipes';
import users from './routes/users';
import reviews from './routes/reviews';
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
//process.env.SECRET;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/v1/recipes', recipes);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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