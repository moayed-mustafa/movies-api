DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

\c moviesdb;

DROP TABLE movies  CASCADE ;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  thumbs_up integer DEFAULT 0,
  thumbs_down integer DEFAULT 0

);
