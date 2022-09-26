package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Message;

public interface MessagingService {

	
//	public List<Map<String, Object>> getListMessage(Integer recpId, Integer sendId);
	
	public Message addMessage(Message message,String username, String recipient);

	List<Message> index(String username, String username2);
	
	List<Message> chatLog(String username, String recipName);
	
	List<Message> chatHistory(String username, String recipName);

	List<Message> show(String username1, String username2, int userId);

	
	
}
