const router = require('express').Router();
const {
  getUsers, getUsersByID, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/:id', getUsersByID);

router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.patch('/users/:id/:avatar', updateAvatar);

module.exports = router;
