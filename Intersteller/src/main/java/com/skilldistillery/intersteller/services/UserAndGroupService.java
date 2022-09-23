package com.skilldistillery.intersteller.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.repositories.ProfileRepository;

@Service
public class UserAndGroupService {
	
	@Autowired
	ProfileRepository profileRepo;
	
	
//	public List<Profile> fetchAll(Integer id){
//		
//	}
	

}
