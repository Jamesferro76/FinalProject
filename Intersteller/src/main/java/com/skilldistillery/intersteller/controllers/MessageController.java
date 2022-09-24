package com.skilldistillery.intersteller.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Message;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class MessageController {

//	@Autowired
//	MessageServiceImpl messageService;
//	
//	
//	
//	@MessageMapping("/chat/{to}")
//	public void sendPersonalMessage(@DestinationVariable String to, Message message) {
//		messageService.sendMessage(to,  message);
//	}
//	
//	
//	@GetMapping("listmessage/{from}/{to}")
//	public List<Map<String, Object>> getListMessageChat(@PathVariable("from") Integer from, @PathVariable("to") Integer to) {
//		return messageService.getListMessage(from, to);
//	}
//	
//	
//	
//	@GetMapping("listmessage/group/{groupid}")
//	public List<Map<String, Object>> getListMessageGroupChat(@PathVariable("groupid") Integer groupid) {
//		return messageService.getListMessageGroups(groupid);
//	}
	
	

	
	

	
	
//	@GetMapping("/fetchAllUsers/{myId}")
//	public List<User> fetchAll(@PathVariable("id") Integer myId) {
//		return uagService.fetchAll(myId);
//	}

	

	
}

