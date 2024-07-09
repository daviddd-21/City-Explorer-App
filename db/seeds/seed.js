const format = require("pg-format");
const fs = require("fs"); // file system

const db = require("../connection");

const seeds = (users, cities) => {
  return db
    .query("DROP TABLE IF EXISTS users;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS cities;").then(() => {});
    })
    .then(() => {
      return db.query(
        "CREATE TABLE cities (id SERIAL PRIMARY KEY, city TEXT, country TEXT, lat FLOAT, lng FLOAT);"
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE users (username TEXT PRIMARY KEY, name TEXT, password TEXT);"
      );
    })
    .then(() => {
      const usersQuery = format(
        "INSERT INTO users (username, name, password) VALUES %L;",
        users.map(({ username, name, password }) => {
          return [username, name, password];
        })
      );
      return db.query(usersQuery);
    })
    .then(() => {
      const citiesQuery = format(
        "INSERT INTO cities (city, country, lat, lng) VALUES %L;",
        cities.map(({ city, country, lat, lng }) => {
          return [city, country, lat, lng];
        })
      );
      return db.query(citiesQuery);
    });
};

module.exports = seeds;
