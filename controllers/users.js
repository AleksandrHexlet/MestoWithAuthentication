const user = require('../models/users');

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => res
      .status(500)
      .send({ message: 'An error happens when i send yours users' }));
};

module.exports.getUsersByID = (req, res) => {
  user
    .findById(req.params.id)
    .then((userbyID) => res.send({ data: userbyID }))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => res
      .status(500)
      .send({ message: 'An error happens when i send yours user by id' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => res.status(500).send({ message: 'Create a new user failed' }));
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
    .catch((err) => res.status(500).send({ message: 'Update a new user failed' }));
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
    .catch((err) => res.status(500).send({ message: 'Update a new avatar failed' }));
};
