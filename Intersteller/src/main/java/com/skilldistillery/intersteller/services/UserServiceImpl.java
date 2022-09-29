package com.skilldistillery.intersteller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.ProfileRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private ProfileRepository proRepo;

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
	public User adminUpdate(String username, Integer userId, User user) {
		Optional<User> userOpt = userRepo.findById(userId);
		User updatedUser = null;
		if(userOpt.isPresent()) {
			updatedUser = userOpt.get();
			if(user.getUsername() != null) {
				updatedUser.setUsername(user.getUsername());
			}
			if(user.getPassword() != null) {
				updatedUser.setPassword(encoder.encode(user.getPassword()));
			}
			if(user.getEmail() != null) {
				updatedUser.setEmail(user.getEmail());
			}
				updatedUser.setActive(user.isActive());
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
	@Override
	public User findByUsername(String username) {
		User userName= userRepo.findByUsername( username );
		User user = null;
	
			return userName;	
		}

	@Override
	public User findByProfile(int profileId) {
		Profile profile=null;
        Optional<Profile> profileOpt= proRepo.findById(profileId);
        if(profileOpt.isPresent()) {
        	profile=profileOpt.get();
        	
        }
		return profile.getUser();	
	
	}

	@Override
	public User update( User user, String username) {
//		User current =userRepo.findByUsername(user.getUsername());
		User current =show(username, user.getId());
		System.out.println(user.getUsername());
		System.out.println(current.getUsername());
		if(current != null) {
			current.setUsername(user.getUsername());
			System.out.println(user.getPassword());
			current.setPassword(encoder.encode(user.getPassword()));
			current.setEmail(user.getEmail());
			current.setActive(user.isActive());
			System.out.println(current);
			userRepo.saveAndFlush(current);

		}
		return current;
	}

	}
	


