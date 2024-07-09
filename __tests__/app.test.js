const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const cities = require('../db/data/tests/cities');
const users = require('../db/data/tests/users');

beforeEach(() => {
  return seed(users, cities);
});

afterAll(() => db.end());

describe('/api/users', () => {
  test('GET:200 - responds with an array of users', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length > 0).toBe(true);
        body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            password: expect.any(String),
          });
        });
      });
  });
});

describe('/api/cities', () => {
  test('GET:200 - responds with an array of cities', () => {
    return request(app)
      .get('/api/cities')
      .expect(200)
      .then(({ body }) => {
        expect(body.cities.length > 0).toBe(true);
        body.cities.forEach((city) => {
          expect(city).toMatchObject({
            city: expect.any(String),
            country: expect.any(String),
            lat: expect.any(Number),
            lng: expect.any(Number),
          });
        });
      });
  });
});

describe('/api/users/:username', () => {
  test('GET:200 - responds the user details using username provided', () => {
    return request(app)
      .get('/api/users/john')
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          username: 'john',
          name: 'John',
          password: '123',
        });
      });
  });
  test('GET:404 - responds with a 404 status code and an appriopriate message when given a non-existent username', () => {
    return request(app)
      .get('/api/users/non-existent')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
  test('GET:404 - responds with a 404 status code and an appriopriate message when given an invalid username', () => {
    return request(app)
      .get('/api/users/123')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
});

describe('/api/cities/:city', () => {
  test('GET:200 - responds with the city details using the city provided', () => {
    return request(app)
      .get('/api/cities/London')
      .expect(200)
      .then(({ body }) => {
        expect(body.city).toMatchObject({
          city: 'London',
          country: 'UK',
          lat: 51.5072,
          lng: -0.1275,
        });
      });
  });
  test('GET:404 - responds with a 404 status code and an appriopriate message when given a non-existent city', () => {
    return request(app)
      .get('/api/cities/invalid-city')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
});

describe('/api/users', () => {
  test('POST:201 - creates a new user', () => {
    return request(app)
      .post('/api/users')
      .send({
        name: 'David',
        username: 'daviddd_21',
        password: '123',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          name: 'David',
          username: 'daviddd_21',
          password: '123',
        });
      });
  });
  test('POST:201 - creates a new user when an addtional field is provided', () => {
    return request(app)
      .post('/api/users')
      .send({
        name: 'David',
        username: 'daviddd_21',
        password: '123',
        city: 'London',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          name: 'David',
          username: 'daviddd_21',
          password: '123',
        });
      });
  });
  test('responds with a 400 status code and an appriopriate message when username provided already exists', () => {
    return request(app)
      .post('/api/users')
      .send({
        name: 'David',
        username: 'john',
        password: '123',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Username already exists');
      });
  });
});

describe('/api/users/:username/:key', () => {
  test("PATCH: 201, responds with a 201 status code and the updated user's details", () => {
    return request(app)
      .patch('/api/users/john/name')
      .send({ name: 'Obediah' })
      .expect(201)
      .then(({ body }) => {
        expect(body.updatedUser).toMatchObject({
          name: 'Obediah',
          username: 'john',
          password: expect.any(String),
        });
      });
  });
});
