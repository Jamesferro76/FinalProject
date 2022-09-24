package com.skilldistillery.intersteller.services;

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
	public Message addMessage(String senderName, Message message, String recipName) {
		User recipient = userRepo.findByUsername(recipName);

		User sender = userRepo.findByUsername(senderName);
		if (sender != null) {
			message.setSender(sender);
			message.setRecipient(recipient);
			return msgRepo.saveAndFlush(message);
		}
		return null;
	}

	@Override
	public List<Message> index(String username) {
		User sender = userRepo.findByUsername(username);
		if (sender != null) {

			return msgRepo.findBySender(sender);
		}
		return null;

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

}
