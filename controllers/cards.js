/* eslint-disable no-unused-vars */
const card = require('../models/cards');

module.exports.getCards = (req, res) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res
      .status(500)
      .send({ message: 'An error happens when i send yours cards' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  card
    .create({ name, link })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res
      .status(500)
      .send({ message: 'An error happens when i create yours cards' }));
};

module.exports.deleteCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.id)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res
      .status(500)
      .send({ message: 'An error happens when i create yours cards' }));
};

module.exports.likeCard = (req, res) => {
  card
    .findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true })
    .then((like) => res.send({ data: like }))
    .catch((err) => res
      .status(500)
      .send({ message: 'An error happens when i set like in yours cards' }));
};

module.exports.dislikeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((like) => res.send({ data: like }))
    .catch((err) => res
      .status(500)
      .send({ message: 'An error happens when i set like in yours cards' }));
};
