package com.skilldistillery.intersteller.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Message;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.services.MessageService;
import com.skilldistillery.intersteller.services.UserAndGroupService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class MessageController {

	@Autowired
	MessageService messageService;
	
	@Autowired
	UserAndGroupService uagService;
	
	
	
	@PostMapping("/chat/{recipient}")
	public void sendPersonalMessage(@DestinationVariable Profile recipient, Message message) {
		messageService.sendMessage(message, recipient);
	}
	
	
	@GetMapping("listmessage/{sender}/{recipient}")
	public List<Message> getListMessageChat(@PathVariable("sender") Profile sender, @PathVariable("recipient") Profile recipient) {
		return messageService.getListMessage(sender, recipient);
	}
	

	
	
//	@GetMapping("/fetchAllUsers/{myId}")
//	public List<User> fetchAll(@PathVariable("id") Integer myId) {
//		return uagService.fetchAll(myId);
//	}

	

	
}

