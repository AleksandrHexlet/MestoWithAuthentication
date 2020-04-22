/* eslint-disable no-unused-vars */
const card = require('../models/cards');

module.exports.getCards = (req, res) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res
      .status(500)
      .send({ message: 'An error happens when i send yours cards' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  card
    .create({ name, link })
    .then((cards) => res.send({ data: cards }))
    .catch(() => res
      .status(500)
      .send({ message: 'An error happens when i create yours cards' }),
    console.log('Function updateUser have error'));
};

module.exports.deleteCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
        console.log('Function deleteCard has error');
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
        res.status(404).send({ message: 'Карточки с таким id не существует' });
        console.log('Function likeCard has error');
      }
    })
    .catch(() => res
      .status(500)
      .send({ message: 'An error happens when i set like in yours cards' }),
    console.log('Function likeUser have error'));
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
        res.status(404).send({ message: 'Карточки с таким id не существует' });
        console.log('Function dislikeCard has error');
      }
    })
    .catch(() => res
      .status(500)
      .send({ message: 'An error happens when i set like in yours cards' }),
    console.log('Function updateUser have error'));
};
