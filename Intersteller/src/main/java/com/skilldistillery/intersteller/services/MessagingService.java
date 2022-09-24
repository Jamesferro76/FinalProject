package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Message;

public interface MessagingService {

	
//	public List<Map<String, Object>> getListMessage(Integer recpId, Integer sendId);
	
	public Message addMessage(String username, Message message, String recipient);

	List<Message> index(String username);
	
	List<Message> chatLog(String username, String recipName);
	
	List<Message> chatHistory(String username, String recipName);

	
	
}
