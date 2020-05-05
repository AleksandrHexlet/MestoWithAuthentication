const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Пользователя с id: ${req.params.id} не существует` });
        console.error(err.stack);
      }
    });
};
module.exports.createUser = (req, res) => {
  if (req.body.password.length <= 7) {
    return res
      .status(404)
      .send({ message: 'Пароль должен быть более 7 символов' });
  }
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    user
      .create({
        name,
        about,
        email,
        password: hash,
        avatar,
      })
      .then((newUser) => user.findOne({ _id: newUser._id }))
      .then((newUser) => res.status(200).send(newUser))
      .catch((err) => {
        res
          .status(500)
          .send({ message: `Не удалось создать пользователь. ${err.message}` });
      });
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
          .send({ message: `Обновление пользователя с id: ${req.params.id} невозможно` });
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
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  user.findOne({ email })
    .select('+password')
    .then((newUser) => {
      if (!newUser) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, newUser.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign(
            { _id: newUser._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          return res.send({ token });
        });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};


// module.exports.login = (req, res) => {
//   const { email, password } = req.body;
//   user.findOne({ email }).select('+password')
//     .then((newUser) => {
//       if (!newUser) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }
//       return bcrypt.compare(password, user.password);
//     })
//   // eslint-disable-next-line consistent-return
//     .then((matched) => {
//       if (!matched) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }
//       const token = jwt.sign(
//         { _id: user._id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//         { expiresIn: '7d' },
//       );
//       // res.cookie('jwt', token, {
//       //   maxAge: 360000 * 24 * 7,
//       //   httpOnly: true,
// eslint-disable-next-line max-len
//       //   // sameSite: true, // браузер отправляет куки, только если запрос сделан с того же домена
//       // });
//       res.send({ token });
//     })
//     .catch((err) => {
//       res.status(401).send({ message: err.message });
//     });
// };

// module.exports.login = (req, res) => {
//   const { email, password } = req.body;
//   user.findOne({ email }).select('+password')
//     .then((newUser) => {
//       if (!newUser) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error('Неправильные почта или пароль'));
//           }
//           const token = jwt.sign(
//             { _id: user._id },
//             NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//             { expiresIn: '7d' },
//           );
//           res.send({ token });
//         })
//     })
//     .catch((err) => {
//       res.status(401).send({ message: err.message });
//     });

// module.exports.createUser = (req, res) => {
//   bcrypt
//     .hash (req.body.password, 10)
//     .then (hash => {
//       user.create ({
//         name: req.body.name,
//         about: req.body.about,
//         avatar: req.body.avatar,
//         email: req.body.email,
//         password: hash,
//       });
//     })
//     .then (newUser => {
//       if (newUser) {
//         return user.findOne ({_id: user._id});
//       }
//       return Promise.reject (
//         new Error ('Пользователь с такими данными существует')
//       );
//       // throw new Error('Пользователь с такими данными существует');
//     })
//     .then (newUser => res.status (200).send (newUser))
//     .catch (err => res.status (500).send ({message: err.message}));
// };

// if (newUser) {
// return user.findOne({ _id: user._id });
// }
// return Promise.reject(
// new Error('Пользователь с такими данными существует'),
// );
// throw new Error('Пользователь с такими данными существует');

// рабочий вариант
// module.exports.createUser = (req, res) => {
//   bcrypt
//     .hash (req.body.password, 10)
//     .then (hash => {
//       user.create ({
//         name: req.body.name,
//         about: req.body.about,
//         avatar: req.body.avatar,
//         email: req.body.email,
//         password: hash,
//       });
//     })
//     .then (newUser => {
//       return user.findOne ({_id: user._id});
//     })
//     .then (newUser => res.status (200).send (newUser))
//     .catch (err =>
//       res
//         .status (500)
//         .send ({message: `Создать пользователь не удалось ${err.message}`})
//     );
// };


//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       user.create({
//         name: req.body.name,
//         about: req.body.about,
//         avatar: req.body.avatar,
//         email: req.body.email,
//         password: hash,
//       });
//     })

//     .then((newUser) => user.findOne({ _id: user._id }))
//     .then((newUser) => res.status(200).send({ message: `${req.params._id}` }))
//     .catch((err) => {
//       if (err.message === 'ENOTFOUND') {
//         return next({ status: 404, message: 'User file not found' });
//       }
//       return next(err);
//     });
// };

// module.exports.createUser = (req, res) => {
//   if (req.body.password.length <= 7) {
//     return res
//       .status (404)
//       .send ({message: 'Пароль должен быть более 7 символов'});
//   }
//   const {name, about, avatar, email, password} = req.body;
//   bcrypt.hash (password, 10).then (hash => {
//     user
//       .create ({
//         email,
//         password: hash,
//         name,
//         about,
//         avatar,
//       })
//       .then (Nuser => user.findOne ({_id: Nuser._id}))
//       .then (Nuser => res.status (200).send (Nuser))
//       .catch (err => {
//         res
//           .status (500)
//           .send ({message: `Создать пользователь не удалось ${err.message}`});
//       });
//   });
// };

// module.exports.createUser = (req, res, next) => {
//   if (req.body.password.length <= 7) {
//     return res
//       .status (404)
//       .send ({message: 'Пароль должен быть более 7 символов'});
//   }
//   bcrypt
//     .hash (req.body.password, 10)
//     .then (hash => {
//       user.create ({
//         name: req.body.name,
//         about: req.body.about,
//         avatar: req.body.avatar,
//         email: req.body.email,
//         password: hash,
//       });
//     })
//     .then (newUser => user.findOne ({_id: newUser._id}))
//     .then (newUser => res.status (200).send (newUser))
//     .catch (err => {
//       if (err.message === 'ENOTFOUND') {
//         return next ({status: 404, message: 'User file not found'});
//       }
//       return next (err);
//     });
// };
