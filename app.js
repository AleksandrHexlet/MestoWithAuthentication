require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true, // создаём уникальный индекс в монго
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

app.use(routerCards);
app.use(routerUsers);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  let { message } = err;
  if (err.name === 'ValidationError') {
    return res.status(400).send('ValidationError');
  }
  if (status === 500) {
    console.error(err.stack || err);
    message = 'unexpected error';
  }
  return res.status(status).send(message);
});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started in ${PORT}`);
});
