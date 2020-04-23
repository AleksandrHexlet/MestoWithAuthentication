const user = require('../models/users');

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Пользователя с id: ${req.params.id} не существует` });
        console.error(err.stack);
      }
    });
};


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: 'Bad request' });
        console.error(err.stack);
      }
    });
};

module.exports.getUsersByID = (req, res) => {
  user
    .findById(req.params.id)
    .then((userbyID) => {
      if (userbyID) {
        res.send({ data: userbyID });
      } else {
        res.status(404).send({ message: `Пользователя с id: ${req.params.id} не существует` });
        console.log('Function getUsersByID has error');
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Пользователя с id: ${req.params.id} не существует` });
        console.error(err.stack);
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(req.user._id, { name, about },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: true, // если пользователь не найден, он будет создан
      })
    .then((updUser) => res.send({ data: updUser }))
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Обноление пользователя с id: ${req.params.id} невозможно` });
        console.error(err.stack);
      }
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user
    .findByIdAndUpdate(req.user._id, { avatar },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: true, // если пользователь не найден, он будет создан
      })
    .then((updAvatar) => res.send({ data: updAvatar }))
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Обноление аваарат с id: ${req.params.id} невозможно` });
        console.error(err.stack);
      }
    });
};
