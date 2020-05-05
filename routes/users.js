const router = require('express').Router();
const {
  getUsers, getUsersByID, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/:id', getUsersByID);
router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.patch('/users/:id/:avatar', updateAvatar);

module.exports = router;
