package com.skilldistillery.intersteller.repositories;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Message;
import com.skilldistillery.intersteller.entities.User;

public interface MessageRepository extends JpaRepository<Message, Integer> {

	List<Message> findBySender(User sender);
	
	List<Message> findBySenderAndRecipient(User sender, User recipient);
	
	List<Message> findBySenderAndRecipientOrSenderAndRecipient(User sender, User recipient, User recipName, User senderName );

	
	


}
