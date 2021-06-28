DROP TABLE IF EXISTS questions_test;

CREATE TABLE questions_test (
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


DROP TABLE IF EXISTS answers_test;

CREATE TABLE answers_test (
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


DROP TABLE IF EXISTS answers_photos_test;

CREATE TABLE answers_photos_test (
  id SERIAL,
  answer_id INTEGER NULL DEFAULT NULL,
  url TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);


SELECT pg_catalog.setval(pg_get_serial_sequence('questions_test', 'question_id'), (SELECT MAX(question_id) FROM questions_test)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('answers_test', 'answer_id'), (SELECT MAX(answer_id) FROM answers_test)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('answers_photos_test', 'id'), (SELECT MAX(id) FROM answers_photos_test)+1);

CREATE INDEX questions_index ON questions_test (
  id_products
);

CREATE INDEX answers_index ON answers_test (
  id_questions
);

CREATE INDEX answers_photos_index ON answers_photos_test (
  answer_id
);