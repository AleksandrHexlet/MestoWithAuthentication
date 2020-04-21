const user = require('../models/users');

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    // eslint-disable-next-line no-unused-vars
    .catch(() => res
      .status(500)
      .send({ message: 'An error happens when i send yours users' }),
    console.log('Function getUsers have error'));
};


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    // eslint-disable-next-line no-unused-vars
    .catch(() => res.status(500).send({ message: 'Create a new user failed' }));
};

module.exports.getUsersByID = (req, res) => {
  user
    .findById(req.params.id)
    .orFail(
      () => res
        .status(500)
        .send({ message: 'An error happens when i send yours user by id' }),
      console.log(
        'Function getUsersByID have error.An error happens when i send yours user by id',
      ),
    )
    .then((userbyID) => {
      if (userbyID) {
        res.send({ data: userbyID });
      } else {
        res.status(404).send({ message: 'Пользователя с таким id не существует' });
        console.log('Function getUsersByID has error');
      }
    })
    .catch(
      () => res
        .status(500)
        .send({
          message: 'An error happens when i send yours user by id',
        }),
      console.log(
        'Function getUsersByID have error.An error happens when i send yours user by id',
      ),
    );
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
    .catch(() => res.status(500).send({ message: 'Update a new user failed' }),
      console.log('Function updateUser have error'));
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
    .catch(() => res.status(500).send({ message: 'Update a new avatar failed' }),
      console.log('Function updateUser has error'));
};
