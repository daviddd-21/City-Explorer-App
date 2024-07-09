const { selectCities, selectCityByCityName } = require('../models/cities-models');

exports.getCities = (req, res, next) => {
  selectCities()
    .then((cities) => {
      res.status(200).send({ cities });
    })
    .catch(next);
};

exports.getCityByCityName = (req, res, next) => {
  const { city } = req.params;
  selectCityByCityName(city)
    .then((city) => {
      res.status(200).send({ city });
    })
    .catch(next);
};
