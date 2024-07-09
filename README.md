# Northcoders City Explorer

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

## Hosted version

Here's a link to the hosted version
[Click here](https://news-api-y9rq.onrender.com)
//change link

## Summary

This project is a built API for the purpose of accessing application data programmatically. The intention here is to have a back end API that allows users to login and register for the app. This API can also provide all the cities available and also the details of a specified city.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Please ensure you have the following installed:

- Node.js (version: 21.7.3 or higher)
- PostgreSQL (version: 14.11 or higher)

### Installation

1. **Clone the Repository**

```
git clone https://github.com/daviddd-21/News-API.git
cd city-explorer-app/back-end
```

2. **Install dependencies**

```
npm install
```

3. **Create environment variables**

Create two `.env` files in the back-end directory of the project: `.env.development` and `.env.test`.

**.env.development**

Set the database for the development by adding:

```
PGDATABASE=city_explorer
```

**.env.test**

Set the database for the test by adding:

```
PGDATABASE=city_explorer_test
```

4. **Set up databases**

```
npm run setup-dbs
```

5. **Seed Local Database**

```
npm run seed
```

6. **Run Tests**

```
npm test
```
