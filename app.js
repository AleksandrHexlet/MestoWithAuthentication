const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5e9b55300c045d0bdc36eda1',
  };
  next();
});

app.use(routerCards);
app.use(routerUsers);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, req, res) => {
  const status = err.status || 500;
  let { message } = err;
  if (status === 500) {
    console.error(err.stack || err);
    message = 'unexpected error';
  }
  res.status(status).send(message);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started in ${PORT}`);
});
