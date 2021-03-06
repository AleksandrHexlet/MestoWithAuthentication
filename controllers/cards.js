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
    .findById(req.params.id)
    .then((cardWithId) => {
      if (cardWithId) {
        const { owner } = cardWithId;
        return owner;
      }
      return Promise.reject(
        new Error(`Карточки с id: ${req.params.id} не существует`),
      );
    })
    .then((owner) => {
      if (req.user._id === owner.toString()) {
        return card.findByIdAndRemove(req.params.id);
      }
      return Promise.reject(
        new Error('Чтобы удалить карточку,вам необходимо быть её владельцем.'),
      );
    })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
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
        res.status(400).send({ message: `Карточки с id: ${req.params.cardId} не существует` });
        console.log('Function likeCard has error');
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Карточки с id: ${req.params.cardId} не существует` });
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
        res.status(404).send({ message: `Карточки с id: ${req.params.cardId} не существует` });
        console.log('Function dislikeCard has error');
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400)
          .send({ message: `Карточки с id: ${req.params.cardId} не существует` });
        console.error(err.stack);
      }
    });
};


// return res
// .status(400)
// .send({ message: `Карточки с id: ${req.params.id} не существует` });
