module.exports.createUser = (req, res) => {

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      user.
        create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      });
    })
    // eslint-disable-next-line no-unused-vars
    .then((newUser) => {
      user.findOne({ _id: user._id });
    })
    .then((newUser) => res.status(200).send(newUser))
    // .then((newUser) => res.send({ data: newUser }))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Bad request' });
        console.error(err.stack);
      }
    });
};
