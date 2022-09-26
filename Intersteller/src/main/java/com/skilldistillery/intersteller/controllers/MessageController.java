package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Message;
import com.skilldistillery.intersteller.services.MessagingService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class MessageController {

	@Autowired
	MessagingService messageService;

	@GetMapping("ichat")
	public List<Message> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		List<Message> myMessages = 	messageService.index(principal.getName(), principal.getName());	
		if(myMessages == null) {
			res.setStatus(404);
		}
		
		return myMessages;
	}

	@GetMapping("ichat/{userId}")
	public List<Message> chatLog(HttpServletRequest req, HttpServletResponse res, Principal principal,
			@PathVariable int userId) {
		return messageService.show(principal.getName(), principal.getName(), userId);
	}
	
	@GetMapping("ichat/history/{recipient}")
	public List<Message> chatHistory(HttpServletRequest req, HttpServletResponse res, Principal principal,
			@PathVariable String recipient) {
		return messageService.chatHistory(principal.getName(), recipient);
	}

	@PostMapping("ichat")
	public Message create(HttpServletRequest req, HttpServletResponse res, @PathVariable String recipient, @RequestBody Message message,
			Principal principal) {
		Message msg = null;
		try {
			msg = messageService.addMessage(message, principal.getName(),  recipient);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return msg;

	}

//	@PostMapping("/chat/{recipient}")
//	public void sendPersonalMessage( @PathVariable String recipient, @RequestBody Message message, Principal principal) {
//		Message msg = null;
//		msg = messageService.sendMessage(recipient, message);
//	}

//	@GetMapping("listmessage/{from}/{to}")
//	public List<Map<String, Object>> getListMessageChat(@PathVariable("from") Integer from,
//			@PathVariable("to") Integer to) {
//		return messageService.getListMessage(from, to);
//	}

}
