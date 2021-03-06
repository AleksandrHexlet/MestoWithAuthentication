const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Пожалуйста пройдите авторизацию' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    console.log(err.stack);
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};


// const { NODE_ENV, JWT_SECRET } = process.env;
// const jwt = require('jsonwebtoken');
// // eslint-disable-next-line consistent-return
// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer')) {
//     return res.status(401).send({ message: 'Необходима авторизация' });
//   }
//   const token = authorization.replace('Bearer ', '');
//   let payload;
//   try {
//     payload = jwt.verify(
//       token,
//       NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//     );
//   } catch (err) {
//     return res.status(401).send({ message: 'Необходима авторизация' });
//   }
//   req.user = payload;
//   next();
// };


// const jwt = require ('jsonwebtoken');

// const {NODE_ENV, JWT_SECRET} = process.env;

// module.exports = (req, res, next) => {
//   const {authorization} = req.cookies.jwt;
//   if (!authorization || !authorization.startsWith ('Bearer ')) {
//     return res.status (401).send ({message: 'Пожалуйста пройдите авторизацию'});
//   }
//   const token = authorization.replace ('Bearer ', '');
//   let payload;
//   try {
//     payload = jwt.verify (
//       token,
//       NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
//     );
//   } catch (err) {
//     console.log (err.stack);
//     return res.status (401).send ({message: 'Необходима авторизация'});
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//   // return payload;
//   return next (); // пропускаем запрос дальше
// };
