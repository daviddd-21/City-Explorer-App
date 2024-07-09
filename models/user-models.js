const db = require('../db/connection');

exports.selectUsers = () => {
  return db.query('SELECT * FROM users;').then(({ rows }) => {
    return rows;
  });
};

exports.selectUserByUsername = (username) => {
  return db.query('SELECT * FROM users WHERE username = $1;', [username]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return rows[0];
  });
};

exports.insertUser = (name, username, password) => {
  return db
    .query('INSERT INTO users (username, name, password) VALUES ($1, $2, $3) RETURNING *;', [
      username,
      name,
      password,
    ])
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateUser = (username, key, patch) => {
  const value = patch[key];
  return db
    .query(`UPDATE users SET ${key} = $1 WHERE username = $2 RETURNING *;`, [value, username])
    .then(({ rows }) => {
      return rows[0];
    });
};
