package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Message;
import com.skilldistillery.intersteller.entities.Profile;

public interface MessageService {
	public void sendMessage( Message message, Profile recipient);
	public List<Message> getListMessage(Profile sender, Profile recipient);
}
