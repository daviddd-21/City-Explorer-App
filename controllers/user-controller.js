const {
  selectUsers,
  selectUserByUsername,
  insertUser,
  updateUser,
} = require('../models/user-models');

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const { name, username, password } = req.body;
  insertUser(name, username, password)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const { username, key } = req.params;
  const patch = req.body;

  updateUser(username, key, patch)
    .then((updatedUser) => {
      res.status(201).send({ updatedUser });
    })
    .catch(next);
};
