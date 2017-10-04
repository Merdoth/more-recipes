import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import database from './models';
import 'dotenv';

// import recipes from './routes/recipes';
import users from './routes/users';

const app = express();
const port = process.env.PORT || 3000;
process.env.SECRET;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));

// app.use('/api/recipes', recipes);
app.use('/api/users', users);

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