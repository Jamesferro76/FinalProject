package com.skilldistillery.intersteller.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.skilldistillery.intersteller.entities.Message;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.repositories.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {


	
		
		
		
		@Autowired
		MessageRepository messageRepo;;
		
		
		public void sendMessage(Message message, Profile recipient) {
			messageRepo.saveAndFlush(message);
		}
		
		
		public List<Message> getListMessage(@PathVariable("sender") Profile sender, @PathVariable("recipient") Profile recipient) {
			List<Message> messages = messageRepo.findAll();
			return messages;
		}


		
		
		
		
		

	}


