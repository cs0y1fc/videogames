DROP SCHEMA IF EXISTS videogames2;

CREATE DATABASE IF NOT EXISTS videogames2;
USE videogames2;

CREATE TABLE IF NOT EXISTS users (
  iduser INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (iduser)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS games (
  idgame INT NOT NULL auto_increment,
  gamename VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  category VARCHAR(255) NULL,
  platforms VARCHAR(255) NULL,
  metacritic VARCHAR(255) NULL,
  release_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  imageUrl varchar(255) NULL,
  RAWG VARCHAR(255) NULL,
  PRIMARY KEY (idgame)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS likes (
  iduser INT NOT NULL,
  idgame INT NOT NULL,
  PRIMARY KEY (iduser, idgame),
  CONSTRAINT fk_users_has_games_users
    FOREIGN KEY (iduser)
    REFERENCES users (iduser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_users_has_games_games1
    FOREIGN KEY (idgame)
    REFERENCES games (idgame)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS rating (
  iduser INT NOT NULL,
  idgame INT NOT NULL,
  rating INT NOT NULL,
  PRIMARY KEY (iduser, idgame),
  CONSTRAINT fk_users_has_games_users1
    FOREIGN KEY (iduser)
    REFERENCES users (iduser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_users_has_games_games2
    FOREIGN KEY (idgame)
    REFERENCES games (idgame)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;



INSERT INTO games (gamename, slug, category, platforms, release_date, imageUrl, RAWG) VALUES 
('The Legend of Zelda: Breath of the Wild', 'the-legend-of-zelda-breath-of-the-wild', 'Adventure', 'Switch, Wii U', '2017-03-03', 'https://example.com/zelda.jpg', '101'),
('God of War', 'god-of-war', 'Action', 'PS4, PS5', '2018-04-20', 'https://example.com/godofwar.jpg', '102'),
('Among Us', 'among-us', 'Party', 'PC, Mobile, Switch', '2018-06-15', 'https://example.com/amongus.jpg', '103'),
('Animal Crossing: New Horizons', 'animal-crossing-new-horizons', 'Simulation', 'Switch', '2020-03-20', 'https://example.com/animalcrossing.jpg', '104'),
('Genshin Impact', 'genshin-impact', 'RPG', 'PC, PS4, PS5, Mobile', '2020-09-28', 'https://example.com/genshinimpact.jpg', '105');





insert into users (iduser, username, email, password, createdAt)  values (12, 'hola', 'hola@gmail.com', 123456, default);

select * from users;

select * from games;

select * from likes;