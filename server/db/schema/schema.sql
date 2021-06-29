-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS atelier;

CREATE DATABASE atelier;

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

COPY products FROM '/home/raphaelspies/Atelier-SDC-2021-MONSTARS/data/product.csv'
DELIMITER ','
CSV HEADER;
-- ---
-- Table 'Reviews'
--
-- ---

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL,
  rating INTEGER NULL DEFAULT NULL,
  summary VARCHAR NULL DEFAULT NULL,
  recommend CHAR NULL DEFAULT NULL,
  response INTEGER NULL DEFAULT NULL,
  body VARCHAR NULL DEFAULT NULL,
  date DATE NULL DEFAULT NULL,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT NULL,
  id_products INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'features'
--
-- ---

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id SERIAL,
  feature VARCHAR NULL DEFAULT NULL,
  value INTEGER NULL DEFAULT NULL,
  id_products INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'category'
--
-- ---

DROP TABLE IF EXISTS category;

CREATE TABLE category (
  id SERIAL,
  name VARCHAR NULL DEFAULT NULL,
  id_products INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Review_photos'
--
-- ---

DROP TABLE IF EXISTS review_photos;

CREATE TABLE review_photos (
  id SERIAL,
  url TEXT NULL DEFAULT NULL,
  id_Reviews INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Questions'
--
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id SERIAL,
  question_body TEXT NULL DEFAULT NULL,
  question_date DATE NULL DEFAULT NULL,
  asker_name VARCHAR NULL DEFAULT NULL,
  asker_email VARCHAR NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULT NULL,
  question_helpfulness INTEGER NULL DEFAULT NULL,
  id_products INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL,
  body TEXT NULL DEFAULT NULL,
  date TEXT NULL DEFAULT NULL,
  answerer_name VARCHAR NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT NULL,
  photos TEXT NULL DEFAULT NULL,
  id_questions INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE Reviews ADD FOREIGN KEY (id_products) REFERENCES Products (id);
-- ALTER TABLE features ADD FOREIGN KEY (id_products) REFERENCES Products (id);
-- ALTER TABLE category ADD FOREIGN KEY (id_Products) REFERENCES Products (id);
-- ALTER TABLE Review_photos ADD FOREIGN KEY (id_Reviews) REFERENCES Reviews (id);
-- ALTER TABLE Questions ADD FOREIGN KEY (id_Products) REFERENCES Products (id);
-- ALTER TABLE Answers ADD FOREIGN KEY (id_Questions) REFERENCES Questions (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Products ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Reviews ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE features ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE category ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Review_photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE answers DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Products (id,name,slogan,description,new field,category,default_price,created_at,updated_at) VALUES
-- ('','','','','','','','','');
-- INSERT INTO Reviews (id,rating,summary,recommend,response,body,date,reviewer_name,helpfulness,id_Products) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO features (id,feature,value,id_Products) VALUES
-- ('','','','');
-- INSERT INTO category (id,name,id_Products) VALUES
-- ('','','');
-- INSERT INTO Review_photos (id,url,id_Reviews) VALUES
-- ('','','');
-- INSERT INTO Questions (id,question_body,question_date,asker_name,question_helpfulness,reported,id_Products) VALUES
-- ('','','','','','','');
-- INSERT INTO Answers (id,body,date,answerer_name,helpfulness,photos,id_Questions) VALUES
-- ('','','','','','','');
