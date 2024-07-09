const db = require('../db/connection');

exports.selectCities = () => {
  return db.query('SELECT * FROM cities;').then(({ rows }) => {
    return rows;
  });
};

exports.selectCityByCityName = (city) => {
  return db.query('SELECT * FROM cities WHERE city = $1;', [city]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return rows[0];
  });
};
