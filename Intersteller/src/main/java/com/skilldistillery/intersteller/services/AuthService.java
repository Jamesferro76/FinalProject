package com.skilldistillery.intersteller.services;

import com.skilldistillery.intersteller.entities.User;

public interface AuthService {

	public User register(User user);

	public User getUserByUsername(String username);

	public User getUserById(int userId);

}
