package com.skilldistillery.intersteller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.ProfileRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class ProfileServiceImpl implements ProfileService {
	
	@Autowired
	private ProfileRepository profileRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Profile> findAll(String username) {
		return profileRepo.findAll();
	}
	
	@Override
	public Profile findById(int id) {
		Profile profile=null;
		 Optional<Profile> profileOpt=profileRepo.findById(id);
		 if(profileOpt.isPresent()) {
			 profile=profileOpt.get();
				 return profile;
		 }
		return null;
	}
	
	@Override
	public Profile create(String username, Profile profile) {
		System.out.println("Top of create");
	  User user = userRepo.findByUsername(username);
	  System.out.println(user.getUsername());
	  if (user != null) {
	    profile.setUser(user);
	    return profileRepo.saveAndFlush(profile);
	  }
	  return null;
	}
	
	@Override
	public Profile update(String username, int id, Profile profile) {
		Optional<Profile> existingOpt= profileRepo.findById(id);
		if(existingOpt.isPresent()) {
			Profile existing=existingOpt.get();
			if(existing.getUser().getUsername().equals(username)) {
				if(profile.getFirstName()!=null) {
					existing.setFirstName(profile.getFirstName());
				}
				if(profile.getSex()!=null) {
					existing.setSex(profile.getSex());
				}
				existing.setDescription(profile.getDescription());
				existing.setBirthday(profile.getBirthday());
				existing.setLastName(profile.getLastName());
				existing.setProfilePic(profile.getProfilePic());
				profileRepo.save(existing);
				return existing;
			 }
		}
		return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		boolean deleted=false;
		System.out.println(username);
		User user = userRepo.findByUsername(username);
		System.out.println(user.getUsername());
		Profile profileToDelete=profileRepo.findByIdAndUserId(id, user.getId());
		System.out.println(profileToDelete.getFirstName());
		if(profileToDelete != null) {
			try {
				profileRepo.delete(profileToDelete);
				deleted=true;
			}catch(Exception e) {
				e.printStackTrace();
			}
			
		}
		return deleted;
	}

}
