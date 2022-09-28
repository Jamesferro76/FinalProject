-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema interstellerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `interstellerdb` ;

-- -----------------------------------------------------
-- Schema interstellerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `interstellerdb` DEFAULT CHARACTER SET utf8 ;
USE `interstellerdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `role` VARCHAR(15) NULL,
  `active` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(2) NULL,
  `zip` VARCHAR(10) NULL,
  `country` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `profile` ;

CREATE TABLE IF NOT EXISTS `profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `birthday` DATE NOT NULL,
  `description` TEXT NULL,
  `sex` VARCHAR(15) NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `address_id` INT NULL,
  `profile_pic` TEXT NULL,
  `active` TINYINT NULL,
  `created_on` DATETIME NULL,
  `updated_on` DATETIME NULL,
  `age` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_profile_User_idx` (`user_id` ASC),
  INDEX `fk_profile_address1_idx` (`address_id` ASC),
  CONSTRAINT `fk_profile_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_profile_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `question` ;

CREATE TABLE IF NOT EXISTS `question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `answer` ;

CREATE TABLE IF NOT EXISTS `answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(105) NULL,
  `question_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_questionAnswer_questionBank1_idx` (`question_id` ASC),
  INDEX `fk_question_answer_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_questionAnswer_questionBank1`
    FOREIGN KEY (`question_id`)
    REFERENCES `question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_question_answer_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `preference`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `preference` ;

CREATE TABLE IF NOT EXISTS `preference` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `profile_answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `profile_answer` ;

CREATE TABLE IF NOT EXISTS `profile_answer` (
  `answer_id` INT NOT NULL,
  `profile_id` INT NOT NULL,
  `question_id` INT NOT NULL,
  PRIMARY KEY (`profile_id`, `question_id`),
  INDEX `fk_questionAnswer_has_profile_questionAnswer1_idx` (`answer_id` ASC),
  INDEX `fk_question_result_profile1_idx` (`profile_id` ASC),
  INDEX `fk_profile_answer_question1_idx` (`question_id` ASC),
  CONSTRAINT `fk_questionAnswer_has_profile_questionAnswer1`
    FOREIGN KEY (`answer_id`)
    REFERENCES `answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_question_result_profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_profile_answer_question1`
    FOREIGN KEY (`question_id`)
    REFERENCES `question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mixer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mixer` ;

CREATE TABLE IF NOT EXISTS `mixer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `event_date` DATE NOT NULL,
  `address_id` INT NOT NULL,
  `event_start` TIME NULL,
  `event_end` TIME NULL,
  `created_date` DATETIME NULL,
  `image_url` VARCHAR(700) NULL,
  `creator_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_event_address1_idx` (`address_id` ASC),
  INDEX `fk_mixer_profile1_idx` (`creator_id` ASC),
  CONSTRAINT `fk_event_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mixer_profile1`
    FOREIGN KEY (`creator_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `sent_date` DATETIME NULL,
  `message_from` INT NULL,
  `message_to` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_message_user1_idx` (`message_from` ASC),
  INDEX `fk_message_user2_idx` (`message_to` ASC),
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`message_from`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user2`
    FOREIGN KEY (`message_to`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `favorite`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `favorite` ;

CREATE TABLE IF NOT EXISTS `favorite` (
  `profile_id` INT NOT NULL,
  `profile_id1` INT NOT NULL,
  PRIMARY KEY (`profile_id`, `profile_id1`),
  INDEX `fk_profile_has_profile_profile2_idx` (`profile_id1` ASC),
  INDEX `fk_profile_has_profile_profile1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_profile_has_profile_profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_profile_has_profile_profile2`
    FOREIGN KEY (`profile_id1`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `star`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `star` ;

CREATE TABLE IF NOT EXISTS `star` (
  `matcher_id` INT NOT NULL,
  `matched_id` INT NOT NULL,
  `matched_on` DATETIME NULL,
  `blocked` TINYINT NULL,
  `blocked_by_id` INT NULL,
  `blocked_date` DATETIME NULL,
  `blocked_reason` TEXT NULL,
  PRIMARY KEY (`matcher_id`, `matched_id`),
  INDEX `fk_profile_has_profile_profile4_idx` (`matched_id` ASC),
  INDEX `fk_profile_has_profile_profile3_idx` (`matcher_id` ASC),
  INDEX `fk_match_profile1_idx` (`blocked_by_id` ASC),
  CONSTRAINT `fk_profile_has_profile_profile3`
    FOREIGN KEY (`matcher_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_profile_has_profile_profile4`
    FOREIGN KEY (`matched_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_profile1`
    FOREIGN KEY (`blocked_by_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `image` ;

CREATE TABLE IF NOT EXISTS `image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(500) NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_profile1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_image_profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `profile_has_preference`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `profile_has_preference` ;

CREATE TABLE IF NOT EXISTS `profile_has_preference` (
  `profile_id` INT NOT NULL,
  `preference_id` INT NOT NULL,
  PRIMARY KEY (`profile_id`, `preference_id`),
  INDEX `fk_profile_has_preference_preference1_idx` (`preference_id` ASC),
  INDEX `fk_profile_has_preference_profile1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_profile_has_preference_profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_profile_has_preference_preference1`
    FOREIGN KEY (`preference_id`)
    REFERENCES `preference` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `profile_has_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `profile_has_category` ;

CREATE TABLE IF NOT EXISTS `profile_has_category` (
  `profile_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`profile_id`, `category_id`),
  INDEX `fk_profile_has_category_category1_idx` (`category_id` ASC),
  INDEX `fk_profile_has_category_profile1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_profile_has_category_profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_profile_has_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mixer_attendee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mixer_attendee` ;

CREATE TABLE IF NOT EXISTS `mixer_attendee` (
  `mixer_id` INT NOT NULL,
  `profile_id` INT NOT NULL,
  `rating` INT NULL,
  `rating_comment` TEXT NULL,
  `rating_date` DATETIME NULL,
  PRIMARY KEY (`mixer_id`, `profile_id`),
  INDEX `fk_mixer_has_profile_profile1_idx` (`profile_id` ASC),
  INDEX `fk_mixer_has_profile_mixer1_idx` (`mixer_id` ASC),
  CONSTRAINT `fk_mixer_has_profile_mixer1`
    FOREIGN KEY (`mixer_id`)
    REFERENCES `mixer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mixer_has_profile_profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS interstelleruser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'interstelleruser'@'localhost' IDENTIFIED BY 'interstelleruser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'interstelleruser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (1, 'admin@gmail.com', 'admin', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'ADMIN', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (2, 'zachkott@gmail.com', 'zkott', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'ADMIN', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (3, 'dshoe@gmail.com', 'dshoe', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'ADMIN', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (4, 'jferro@gmail.com', 'jferro', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'ADMIN', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (5, 'celectra@gmail.com', 'electra', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (6, 'bpitt@gmail.com', 'bpitt', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (7, 'spears@gmail.com', 'bspears', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (8, 'mmyers@gmail.com', 'mmyers', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (9, 'ajolie@gmail.com', 'ajolie', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (10, 'tfey@gmail.com', 'tfey', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (11, 'rreynolds@gmail.com', 'ryanr', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (12, 'blively@gmail.com', 'blakel', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (13, 'scarrel@gmail.com', 'stevec', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (14, 'jalba@gmail.com', 'jalba', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (15, 'mdamon@gmail.com', 'damonm', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (16, 'scarjo@gmail.com', 'scarjo', '$2a$10$heZNWDolzWRAikNAHAIsAeu3T7PgVyl.R59wrUqQb8K5CtZXKyEGe', 'USER', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (1, '123 admin st', 'Seattle', 'WA', '98103', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (2, '69 mixer ave', 'Portland', 'OR', '92012', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (3, '9027 meridian ave', 'San Diego', 'CA', '97455', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (4, '111 this st', 'Portland', 'OR', '92012', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (5, '222 that st', 'Queens', 'NY', '65123', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (6, '333 here rd', 'Vancouver', 'WA', '93210', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (7, '444 over ave', 'Greensboro', 'NC', '27455', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (8, '555 sled circle', 'Los Angeles', 'CA', '90210', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (9, '666 demon rd', 'Orlando', 'FL', '87123', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (10, '777 lucky dr', 'Las Vegas', 'NV', '71254', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (11, '888 this big st', 'Denver', 'CO', '61290', 'United Statees');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (12, '999 huge ave', 'Austin', 'TX', '20936', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (13, '1020 jug rd', 'Port Orchard', 'WA', '91782', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (14, '926 hillbilly way', 'Louisville', 'KY', '56209', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (15, '2002 greater ln', 'Charlotte ', 'NC', '98166', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (16, '5273 turnaround ln', 'Huntsville', 'AL', '67812', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (17, '2634 little rd', 'Brooklyn', 'NY', '72903', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (18, '3415 mixer ad', 'Charlotte', 'NC', '27865', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (19, '6754 mixer st', 'Huntersville', 'NC', '27564', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (20, '7776 mixer ln', 'San Clemente', 'CA', '97345', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (21, '8891 mixer dr', 'Sacramento', 'CA', '98162', 'United States');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (22, '9990 mixer ct', 'Los Angeles', 'CA', '87192', 'United Staes');

COMMIT;


-- -----------------------------------------------------
-- Data for table `profile`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (1, '1993-09-21', 'admin', 'Male', 'Rob', 'Roselius', 1, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbDR9QZ2giGpDUwFPg2gSjgSgA0iR0Kl_8hI_V_tBZzaWN-7WbkfoJALr04m4JgdpUE24&usqp=CAU', 1, NULL, NULL, '87');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (2, '1992-06-21', 'test', 'Male', 'Zach', 'Kotterer', 2, 3, 'https://live.staticflickr.com/65535/50021279553_f178d7328f_n.jpg', 1, NULL, NULL, '29');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (3, '1987-07-04', 'daniel', 'Male', 'Daniel', 'Schulenberg', 3, 4, 'https://compote.slate.com/images/18392094-d41b-46b3-a6c9-4c424799117c.jpg?crop=590%2C791%2Cx0%2Cy0', 1, NULL, NULL, '35');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (4, '1994-08-12', 'james', 'Male', 'James', 'Ferro', 4, 5, 'https://cdn.punchng.com/wp-content/uploads/2021/07/24003431/Lauren-James.jpg', 1, NULL, NULL, '28');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (5, '1985-06-12', 'carmen', 'Female', 'Carmen', 'Electra', 5, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2VBnQB4HLEaJ8UJxZcS8fXxRWhQJmW2xOVQ&usqp=CAU', 1, NULL, NULL, '33');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (6, '1970-02-07', 'brad', 'Male', 'Brad', 'Pitt', 6, 7, 'https://i.insider.com/586d2e10dd08955e118b45eb?width=700', 1, NULL, NULL, '33');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (7, '1980-03-12', 'brittney', 'Female', 'Brittney', 'Spears', 7, 8, 'https://hips.hearstapps.com/hmg-prod/images/britney-spears-during-the-2000-mtv-video-music-awards-at-news-photo-1600877657.jpg', 1, NULL, NULL, '44');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (8, '1974-09-01', 'mike', 'Male', 'Mike', 'Myers', 8, 9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCwlbnH-SYwDoB-ZgqZ-Z8T36lO16QlCZb9Q&usqp=CAU', 1, NULL, NULL, '35');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (9, '1972-12-20', 'angelina', 'Female', 'Angelina', 'Jolie', 9, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYsX8onM_XgY4RxipUndTsqbjc5WJD-GRpdQ&usqp=CAU', 1, NULL, NULL, '54');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (10, '1973-04-20', 'tina', 'Female', 'Tina', 'Fey', 10, 11, 'https://media.vanityfair.com/photos/573c9264f4b19f731d188a92/master/pass/Tina-Fey-Annie-Leibovitz-Jan-2009.jpg', 1, NULL, NULL, '33');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (11, '1983-08-27', 'ryan', 'Male', 'Ryan', 'Reynolds', 11, 12, 'https://c8.alamy.com/zooms/9/418e3cbbf68a4e1a907527b4d22a639e/pm62b8.jpg', 1, NULL, NULL, '44');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (12, '1985-10-06', 'blake', 'Female', 'Blake', 'Lively', 12, 13, 'https://www.etonline.com/sites/default/files/styles/max_640x640/public/images/2022-04/Blake-Lively-Getty-1920.jpg?h=9de51153&itok=4j453nCC', 1, NULL, NULL, '55');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (13, '1972-08-06', 'steve', 'Male', 'Steve', 'Carrel', 13, 14, 'https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Fhiddenremote.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2022%2F07%2F1052053620-850x560.jpeg', 1, NULL, NULL, '65');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (14, '1986-09-16', 'jessica', 'Female', 'Jessica', 'Alba', 14, 15, 'https://i.pinimg.com/736x/30/4b/62/304b620d0b27efed740ac4840e440aa8.jpg', 1, NULL, NULL, '43');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (15, '1972-01-09', 'matt', 'Male', 'Matt', 'Damon', 15, 16, 'https://media.gq.com/photos/612f8c3c73b9651b2559a87f/master/w_1600%2Cc_limit/matt-damon-gq-cover-october-2021-08.jpg', 1, NULL, NULL, '33');
INSERT INTO `profile` (`id`, `birthday`, `description`, `sex`, `first_name`, `last_name`, `user_id`, `address_id`, `profile_pic`, `active`, `created_on`, `updated_on`, `age`) VALUES (16, '1983-05-12', 'scarlett', 'Female', 'Scarlett', 'Johansen', 16, 17, 'https://i.discogs.com/U6Fjw9wGGRpyU5Tz6z6m-RSVw2qu7BLPaaflR01jNYg/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTExMTI5/NzctMTUzNDY2Mzk3/Ny0yNTMzLmpwZWc.jpeg', 1, NULL, NULL, '44');

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `category` (`id`, `name`) VALUES (1, 'Active');
INSERT INTO `category` (`id`, `name`) VALUES (2, 'Athletic');
INSERT INTO `category` (`id`, `name`) VALUES (3, 'Clean');
INSERT INTO `category` (`id`, `name`) VALUES (4, 'Flexible');
INSERT INTO `category` (`id`, `name`) VALUES (5, 'Dedicated');
INSERT INTO `category` (`id`, `name`) VALUES (6, 'Humorous');
INSERT INTO `category` (`id`, `name`) VALUES (7, 'Ambitious');
INSERT INTO `category` (`id`, `name`) VALUES (8, 'Unpredictable');
INSERT INTO `category` (`id`, `name`) VALUES (9, 'Quiet');
INSERT INTO `category` (`id`, `name`) VALUES (10, 'Sarcastic');

COMMIT;


-- -----------------------------------------------------
-- Data for table `question`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `question` (`id`, `question`) VALUES (1, 'What do you value most in a relationship?');

COMMIT;


-- -----------------------------------------------------
-- Data for table `answer`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `answer` (`id`, `answer`, `question_id`, `category_id`) VALUES (1, 'Quality time', 1, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `preference`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `preference` (`id`, `name`) VALUES (1, 'Men');
INSERT INTO `preference` (`id`, `name`) VALUES (2, 'Women');
INSERT INTO `preference` (`id`, `name`) VALUES (3, 'Trans');
INSERT INTO `preference` (`id`, `name`) VALUES (4, 'Pan');
INSERT INTO `preference` (`id`, `name`) VALUES (5, 'Non-Binary');

COMMIT;


-- -----------------------------------------------------
-- Data for table `profile_answer`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `profile_answer` (`answer_id`, `profile_id`, `question_id`) VALUES (1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mixer`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `mixer` (`id`, `name`, `description`, `event_date`, `address_id`, `event_start`, `event_end`, `created_date`, `image_url`, `creator_id`) VALUES (1, 'mixer test', 'a great place for a first date', '2022-09-30', 2, '17:00:00', '20:00:00', NULL, 'https://live.staticflickr.com/65535/50021255956_4dd62a6104_z.jpg', 1);
INSERT INTO `mixer` (`id`, `name`, `description`, `event_date`, `address_id`, `event_start`, `event_end`, `created_date`, `image_url`, `creator_id`) VALUES (2, 'Drinks N\' the Park', 'a park... drinks.... romance...', '2022-10-04', 18, '18:00:00', '22:00:00', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPWPFX1jZzLBk2ou7yoAJvGJb8G2Yzz_et4A&usqp=CAU', 1);
INSERT INTO `mixer` (`id`, `name`, `description`, `event_date`, `address_id`, `event_start`, `event_end`, `created_date`, `image_url`, `creator_id`) VALUES (3, 'Molded by Love', 'makes some cool pottery with the person you want accidentally matched with and they reponded so fast, and you felt bad and said yes to this mixer... which youre dreading... because they already asked you to meet their mother....you can proably make a cool bowl though', '2022-11-17', 19, '16:00:00', '21:00:00', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8AblEWcyY9BZW0amu99pXg5VdC5SpOM4nA&usqp=CAU', 1);
INSERT INTO `mixer` (`id`, `name`, `description`, `event_date`, `address_id`, `event_start`, `event_end`, `created_date`, `image_url`, `creator_id`) VALUES (4, 'Dave\'s Drive In', 'get comfy and sensual at the drive in', '2023-01-22', 20, '19:00:00', '22:00:00', NULL, 'https://www.ucf.edu/news/files/2021/02/date-night-ideas.jpg', 1);
INSERT INTO `mixer` (`id`, `name`, `description`, `event_date`, `address_id`, `event_start`, `event_end`, `created_date`, `image_url`, `creator_id`) VALUES (5, 'Active couples', 'get your heart pumpin and get off the couch, its been a year since your ex left....seriously.. take better care of yourself... and go to this mixer to meet an active person who will get you into shape... and maybe find love...maybe', '2022-12-13', 21, '18:00:00', '22:00:00', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtxLUUiCIXJeKWyWfkVL7AGzhYu-7gGuYkKw&usqp=CAU', 1);
INSERT INTO `mixer` (`id`, `name`, `description`, `event_date`, `address_id`, `event_start`, `event_end`, `created_date`, `image_url`, `creator_id`) VALUES (6, 'Love At The Lake', 'Find your anchor at Larry\'s Lake mixer', '2023-06-21', 22, '17:00:00', '23:59:00', NULL, 'https://media.timeout.com/images/105915468/image.jpg', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `message`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `message` (`id`, `content`, `sent_date`, `message_from`, `message_to`) VALUES (1, 'Maybe now', NULL, 2, 1);
INSERT INTO `message` (`id`, `content`, `sent_date`, `message_from`, `message_to`) VALUES (2, 'why?', NULL, 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `favorite`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `favorite` (`profile_id`, `profile_id1`) VALUES (1, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `star`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `star` (`matcher_id`, `matched_id`, `matched_on`, `blocked`, `blocked_by_id`, `blocked_date`, `blocked_reason`) VALUES (1, 2, NULL, 1, 2, NULL, 'ugly');
INSERT INTO `star` (`matcher_id`, `matched_id`, `matched_on`, `blocked`, `blocked_by_id`, `blocked_date`, `blocked_reason`) VALUES (2, 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `star` (`matcher_id`, `matched_id`, `matched_on`, `blocked`, `blocked_by_id`, `blocked_date`, `blocked_reason`) VALUES (2, 6, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `image`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `image` (`id`, `image_url`, `profile_id`) VALUES (1, 'https://live.staticflickr.com/65535/50022047712_239c407207.jpg', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `profile_has_preference`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `profile_has_preference` (`profile_id`, `preference_id`) VALUES (1, 1);
INSERT INTO `profile_has_preference` (`profile_id`, `preference_id`) VALUES (1, 3);
INSERT INTO `profile_has_preference` (`profile_id`, `preference_id`) VALUES (1, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `profile_has_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (1, 2);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (2, 2);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (2, 6);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (2, 4);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (3, 2);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (3, 3);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (3, 5);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (4, 6);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (4, 1);
INSERT INTO `profile_has_category` (`profile_id`, `category_id`) VALUES (4, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mixer_attendee`
-- -----------------------------------------------------
START TRANSACTION;
USE `interstellerdb`;
INSERT INTO `mixer_attendee` (`mixer_id`, `profile_id`, `rating`, `rating_comment`, `rating_date`) VALUES (1, 1, 5, 'awesome mixer', NULL);

COMMIT;

