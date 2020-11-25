
/** Database setup */


const { Client } = require("pg");
let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "moviesdbtest";
} else {
  DB_URI  = process.env.DATABASE_URL || 'moviesdb';
}

const client = new Client({
    connectionString: DB_URI
  });

  client.connect();


  module.exports = client;