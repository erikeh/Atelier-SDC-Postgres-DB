--Database
DROP DATABASE IF EXISTS atelier;

CREATE DATABASE atelier;

-- Products
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL,
  name VARCHAR NULL DEFAULT NULL,
  slogan VARCHAR NULL DEFAULT NULL,
  description VARCHAR NULL DEFAULT NULL,
  category VARCHAR NULL DEFAULT NULL,
  default_price INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX products_id_index on products(id);
COPY products FROM '/home/raphaelspies/Atelier-SDC-2021-MONSTARS/data/product.csv'
DELIMITER ','
CSV HEADER;

-- Styles
DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id SERIAL,
  productid VARCHAR NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  sale_price VARCHAR NULL DEFAULT NULL,
  original_price INTEGER NULL DEFAULT NULL,
  default_style INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX styles_index on styles(id);
COPY styles FROM '/home/raphaelspies/Atelier-SDC-2021-MONSTARS/data/styles.csv'
DELIMITER ','
CSV HEADER;

--  Photos
DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL,
  styleid INTEGER NULL DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  thumbnail_url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX photos_styleid_index on photos(styleid);
COPY photos FROM '/home/raphaelspies/Atelier-SDC-2021-MONSTARS/data/photos.csv'
DELIMITER ','
CSV HEADER;

--photos
DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id SERIAL,
  product_id INTEGER NULL DEFAULT NULL,
  feature VARCHAR NULL DEFAULT NULL,
  value VARCHAR  NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX features_productid_index on features(product_id);
COPY features FROM '/home/raphaelspies/Atelier-SDC-2021-MONSTARS/data/features.csv'
DELIMITER ','
CSV HEADER;

--skus
DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id SERIAL,
  styleid INTEGER NULL DEFAULT NULL,
  size VARCHAR NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX skus_styleid_index on skus(styleid);
COPY skus FROM '/home/raphaelspies/Atelier-SDC-2021-MONSTARS/data/skus.csv'
DELIMITER ','
CSV HEADER;