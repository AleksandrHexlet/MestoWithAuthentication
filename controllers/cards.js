/* eslint-disable no-unused-vars */
const card = require('../models/cards');

module.exports.getCards = (req, res) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: 'Bad request' });
        console.error(err.stack);
      }
    });
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;

  const { name, link } = req.body;
  card
    .create({ name, link, owner })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: 'Bad request' });
        console.error(err.stack);
      }
    });
};
module.exports.deleteCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(400).send({ message: `Карточки с id: ${req.params.id} не существует` });
        console.error();
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Карточки с id: ${req.params.id} не существует` });
        console.error(err.stack);
      }
    });
};
module.exports.likeCard = (req, res) => {
  card
    .findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true })
    .then((like) => {
      if (like) {
        res.send({ data: like });
      } else {
        res.status(400).send({ message: `Карточки с id: ${req.params.id} не существует` });
        console.log('Function likeCard has error');
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Карточки с id: ${req.params.id} не существует` });
        console.error(err.stack);
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((like) => {
      if (like) {
        res.send({ data: like });
      } else {
        res.status(404).send({ message: `Карточки с id: ${req.params.id} не существует` });
        console.log('Function dislikeCard has error');
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Карточки с id: ${req.params.id} не существует` });
        console.error(err.stack);
      }
    });
};


// card.create ({name, link}).then (cards => {
//   if (cards) {
//     res.send ({data: cards});
//   } else {
//     res.status (404).send ({message: 'An error happens'});
//   }
// });
