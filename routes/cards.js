const router = require('express').Router();
const {
  getCards, createCard, deleteCard, dislikeCard, likeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
router.delete('/cards/:cardId/likes', dislikeCard);
router.put('/cards/:cardId/likes', likeCard);

module.exports = router;
