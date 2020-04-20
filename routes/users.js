const router = require('express').Router();
const {
  getUsers, getUsersByID, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/:id', getUsersByID);

router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/:me', updateUser);
router.patch('/users/:me/:avatar', updateAvatar);

module.exports = router;
