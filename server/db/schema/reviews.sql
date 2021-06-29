DROP DATABASE IF EXISTS atelier;

CREATE DATABASE atelier;

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL,
  product_id INTEGER NULL DEFAULT NULL,
  rating INTEGER NULL DEFAULT NULL,
  date BIGINT NULL DEFAULT NULL,
  summary TEXT NULL DEFAULT NULL,
  body TEXT NULL DEFAULT NULL,
  recommend BOOLEAN,
  reported BOOLEAN NULL DEFAULT false,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  response VARCHAR(255) DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT 0,
  PRIMARY KEY (id)
);

COPY reviews
FROM '/Users/nickkim/Atelier-SDC-2021-MONSTARS/CSV/reviews.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('reviews','id'), (SELECT MAX(id) FROM reviews)+1);
CREATE INDEX reviews_productid_idx on reviews(product_id);

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id SERIAL,
  product_id INTEGER NULL DEFAULT NULL,
  name VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY characteristics
FROM '/Users/nickkim/Atelier-SDC-2021-MONSTARS/CSV/characteristics.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('characteristics','id'), (SELECT MAX(id) FROM characteristics)+1);
CREATE INDEX chara_productid_idx on characteristics(product_id);

DROP TABLE IF EXISTS characteristic_reviews;

CREATE TABLE characteristic_reviews (
  id SERIAL,
  character_id INTEGER NULL DEFAULT NULL,
  review_id INTEGER NULL DEFAULT NULL,
  value INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY characteristic_reviews
FROM '/Users/nickkim/Atelier-SDC-2021-MONSTARS/CSV/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('characteristic_reviews','id'), (SELECT MAX(id) FROM characteristic_reviews)+1);
CREATE INDEX chara_charaid_idx on characteristic_reviews(character_id);

DROP TABLE IF EXISTS review_photos;

CREATE TABLE review_photos (
  id SERIAL,
  review_id INTEGER NULL DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY review_photos
FROM '/Users/nickkim/Atelier-SDC-2021-MONSTARS/CSV/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('review_photos','id'), (SELECT MAX(id) FROM review_photos)+1);
CREATE INDEX photos_reviewid_idx on review_photos(review_id);
