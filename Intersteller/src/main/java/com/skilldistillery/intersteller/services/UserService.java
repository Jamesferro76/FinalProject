package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.User;

public interface UserService {

	
	public List<User> index(String username);
	
	public User show(String username, Integer userId);
	
	public User create(String Username, User user);
	
	public User update(String username, Integer userId, User user);
	
	public boolean destroy(String username,  Integer userId);

	public User findByUsername(String username);
}
