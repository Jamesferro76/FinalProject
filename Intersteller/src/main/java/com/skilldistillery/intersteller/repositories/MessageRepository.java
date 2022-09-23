package com.skilldistillery.intersteller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

}
