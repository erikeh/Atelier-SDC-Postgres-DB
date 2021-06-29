DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  question_id SERIAL,
  id_products INTEGER NULL DEFAULT NULL,
  question_body TEXT NULL DEFAULT NULL,
  question_date BIGINT NULL DEFAULT NULL,
  asker_name VARCHAR NULL DEFAULT NULL,
  asker_email VARCHAR NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULT false,
  question_helpfulness INTEGER NULL DEFAULT 0,
  PRIMARY KEY (question_id)
);

COPY questions
FROM '/Users/erikoh/Desktop/hackreactor/SDC/Atelier-SDC-2021-MONSTARS/data/questions.csv'
DELIMITER ','
CSV;

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  answer_id SERIAL,
  id_questions INTEGER NULL DEFAULT NULL,
  body TEXT NULL DEFAULT NULL,
  date TEXT NULL DEFAULT NULL,
  answerer_name VARCHAR NULL DEFAULT NULL,
  answerer_email VARCHAR NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULt false,
  helpfulness INTEGER NULL DEFAULT 0,
  PRIMARY KEY (answer_id)
);

COPY answers
FROM '/Users/erikoh/Desktop/hackreactor/SDC/Atelier-SDC-2021-MONSTARS/data/answers.csv'
DELIMITER ','
CSV HEADER;

DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
  id SERIAL,
  answer_id INTEGER NULL DEFAULT NULL,
  url TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY answers_photos
FROM '/Users/erikoh/Desktop/hackreactor/SDC/Atelier-SDC-2021-MONSTARS/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'question_id'), (SELECT MAX(question_id) FROM questions)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'answer_id'), (SELECT MAX(answer_id) FROM answers)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('answers_photos', 'id'), (SELECT MAX(id) FROM answers_photos)+1);

CREATE INDEX questions_index ON questions (
  id_products
);

CREATE INDEX answers_index ON answers (
  id_questions
);

CREATE INDEX answers_photos_index ON answers_photos (
  answer_id
);