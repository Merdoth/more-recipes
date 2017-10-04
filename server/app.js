import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import database from './models';
import dotenv from 'dotenv';
import recipes from './routes/recipes';
import users from './routes/users';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
//process.env.SECRET;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/api/v1/recipes', recipes);
app.use('/api/v1/users', users);

app.get('/', (req, res) =>{
  res.status(200).send({
    Message: 'Welcome to more Recipes!'
  });
});

database.sequelize.authenticate()
  .then (() => app.listen(port, () => {
    console.log(`Server is up ${port}`);
  }))
  .catch(error => console.log(error));

export default app;