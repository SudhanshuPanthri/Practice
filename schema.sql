CREATE DATABASE notes;
USE notes;

CREATE TABLE notes(
    id integer PRIMARY KEY AUTO_INCREMENT,
    title varchar(200) NOT NULL,
    content TEXT NOT NULL,
    creation TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes(title,content)
VALUES
("First Note","This is my first note"),
("Second Note","This is my second note");