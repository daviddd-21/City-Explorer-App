const express = require('express');
const cors = require('cors');
const app = express();
const {
  getUsers,
  getUserByUsername,
  postUser,
  patchUser,
} = require('./controllers/user-controller');
const { getCities, getCityByCityName } = require('./controllers/cities-controller');
// const routes = require("./routes");

app.use(cors());
app.use(express.json());

app.get('/api/users', getUsers);
app.get('/api/users/:username', getUserByUsername);
app.post('/api/users', postUser);
app.patch('/api/users/:username/:key', patchUser);

app.get('/api/cities', getCities);
app.get('/api/cities/:city', getCityByCityName);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === '23505') {
    res.status(400).send({ msg: 'Username already exists' });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code) {
    console.log(err, 'this one');
    res.status(404).send({ msg: 'Not found' });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal server error' });
});

module.exports = app;
