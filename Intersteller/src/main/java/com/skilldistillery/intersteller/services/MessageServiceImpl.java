package com.skilldistillery.intersteller.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Message;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.MessageRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class MessageServiceImpl implements MessagingService {

//	@Autowired
//	private SimpMessagingTemplate simpMessagingTemplate;
//
//	@Autowired
//	JdbcTemplate jdbcTemplate;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private MessageRepository msgRepo;

//	public List<Map<String, Object>> getListMessage(@PathVariable("from") Integer from,
//			@PathVariable("to") Integer to) {
//		return jdbcTemplate.queryForList("SELECT * from message where (message_from = ? AND message_to = ?)"
//				+ " OR (message_to = ? AND message_from = ?) ORDER BY created ASC", from, to, from, to);
//	}

	@Override
	public Message addMessage(Message message, String senderName, String recipName) {
		User recipient = userRepo.findByUsername(recipName);
		User sender = userRepo.findByUsername(senderName);
		Message newMessage = null;
		if (sender != null && recipient != null) {
			newMessage = new Message();
			newMessage.setContent(message.getContent());
			newMessage.setSendDate(message.getSendDate());
			newMessage.setSender(sender);
			newMessage.setRecipient(recipient);
			
		}
		return msgRepo.saveAndFlush(newMessage);
	}

	@Override
	public List<Message> index(String username, String username2) {
		List<Message> messages = null;
		User sender = userRepo.findByUsername(username);
		if (sender != null) {

			messages = msgRepo.findBySender_UsernameOrRecipient_Username(username, username2);
		}
		return messages;

	}

	@Override
	public List<Message> chatLog(String username, String recipName) {
		User recipient = userRepo.findByUsername(recipName);
		User sender = userRepo.findByUsername(username);
		if (sender != null) {

			return msgRepo.findBySenderAndRecipient(sender, recipient);
		}
		return null;
	}

	@Override
	public List<Message> chatHistory(String username, String recipName) {
		User recipient = userRepo.findByUsername(recipName);
		User sender = userRepo.findByUsername(username);
		if (sender != null) {

			return msgRepo.findBySenderAndRecipientOrSenderAndRecipient(sender, recipient, recipient, sender);
		}

		return null;
	}
	
	@Override
	public List<Message> show(String username1, String username2, int userId) {
		
		List<Message> messages = index(username1, username2);
		List<Message> userMessages = new ArrayList<>(); 
		
		for(Message message : messages) {
			if(message.getRecipient().getId() == userId) {
				userMessages.add(message);
			}
		}
		return userMessages; 
	}

}
