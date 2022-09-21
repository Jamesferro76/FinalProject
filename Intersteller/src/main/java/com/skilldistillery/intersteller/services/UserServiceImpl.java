package com.skilldistillery.intersteller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public List<User> index(String username) {
		return userRepo.findAll();
	}

	@Override
	public User show(String username, Integer userId) {
		Optional<User> userOpt = userRepo.findById(userId);
		User user = null;
		if(userOpt.isPresent()) {
			user = userOpt.get();
		}
		return user;
	}

	@Override
	public User create(String Username, User user) {
		userRepo.saveAndFlush(user);
		return user;
	}

	@Override
	public User update(String username, Integer userId, User user) {
		Optional<User> userOpt = userRepo.findById(userId);
		User updatedUser = null;
		if(userOpt.isPresent()) {
			updatedUser = userOpt.get();
			if(user.getUsername() != null) {
				updatedUser.setUsername(user.getUsername());
			}
			if(user.getPassword() != null) {
				updatedUser.setUsername(encoder.encode(user.getPassword()));
			}
			if(user.getEmail() != null) {
				updatedUser.setUsername(user.getEmail());
			}
			userRepo.flush();
		}
		return updatedUser;
	}

	@Override
	public boolean destroy(String username, Integer userId) {
		boolean deleted = false;
		Optional<User> userOpt = userRepo.findById(userId);
		User user = null;
		if(userOpt.isPresent()) {
			user = userOpt.get();
			user.setActive(false);
			userRepo.saveAndFlush(user);
			deleted = true;
		}
		
		return deleted;
	}

}
