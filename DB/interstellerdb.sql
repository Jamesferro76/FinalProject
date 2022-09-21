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
  `address_id` INT NOT NULL,
  `profile_pic` VARCHAR(500) NULL,
  `active` TINYINT NULL,
  `created_on` DATETIME NULL,
  `updated_on` DATETIME NULL,
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
  `image_url` VARCHAR(500) NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_event_address1_idx` (`address_id` ASC),
  INDEX `fk_mixer_profile1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_event_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mixer_profile1`
    FOREIGN KEY (`profile_id`)
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
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_message_profile1_idx` (`sender_id` ASC),
  INDEX `fk_message_profile2_idx` (`recipient_id` ASC),
  CONSTRAINT `fk_message_profile1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_profile2`
    FOREIGN KEY (`recipient_id`)
    REFERENCES `profile` (`id`)
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
-- Table `friend`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `friend` ;

CREATE TABLE IF NOT EXISTS `friend` (
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
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `active`) VALUES (1, NULL, 'admin', 'admin', NULL, 1);

COMMIT;
