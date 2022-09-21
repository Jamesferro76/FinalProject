package com.skilldistillery.intersteller.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		user.setActive(true);
		user.setRole("standard");
		return userRepo.saveAndFlush(user);
	}

	@Override
	public User getUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepo.findByUsername(username);
	}
	
	@Override
	public User getUserById(int userId) {
		Optional<User> userOpt = userRepo.findById(userId);
		User user = null;
		if(userOpt.isPresent()) {
			user = userOpt.get();
		}
		return user;
	}

}