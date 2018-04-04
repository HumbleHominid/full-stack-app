CREATE DATABASE FSA;

USE FSA;

CREATE TABLE FSA_USERS (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL
)

INSERT INTO FSA_USERS (firstname, lastname) VALUES ('michael', 'fryer');

INSERT INTO FSA_USERS (firstname, lastname) VALUES ('michael', 'poop');

INSERT INTO FSA_USERS (firstname, lastname) VALUES ('john', 'doe');
