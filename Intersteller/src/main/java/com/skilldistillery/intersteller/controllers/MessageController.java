package com.skilldistillery.intersteller.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Message;
import com.skilldistillery.intersteller.repositories.MessageRepository;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class MessageController {

	 @Autowired
	    MessageRepository messageRepository;
	 
	 @Autowired
	    private SimpMessagingTemplate template;

	    @GetMapping(value = "/messages/{channelId}")
	    public Page<Message> findMessages(Pageable pageable, @PathVariable("channelId") String channelId) {
	        return messageRepository.findAllByChannel(channelId, pageable);
	    }
	    
	    @MessageMapping("/messages")
	    public void handleMessage(Message message) {
	        message.setSendDate(new Date());
	        messageRepository.save(message);
	        template.convertAndSend("/channel/chat/" + message.getChannel(), message);
	    }

	
}

