package com.skilldistillery.intersteller.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.Star;
import com.skilldistillery.intersteller.entities.StarId;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.ProfileRepository;
import com.skilldistillery.intersteller.repositories.StarRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class StarServiceImpl implements StarService {
	
	@Autowired
	private StarRepository starRepo;
	
	@Autowired
	private ProfileRepository profileRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Star create(String name, Star star) {
		Profile profile = profileRepo.findByUserUsername(name);
		System.out.println("Above if statement in create");
			if(profile.getId()==star.getMatched().getId()||profile.getId()==star.getMatcher().getId()) {
				
				StarId starId= new StarId(star.getMatched().getId(), star.getMatcher().getId());
				star.setId(starId);
				System.out.println("Inside if statement in create");
				
				return starRepo.saveAndFlush(star);
			}
		return null;
	}


	@Override
	public Star findSpecificStar(int id, String username) {
		Star star=null;
		
		Profile profile1= profileRepo.findByUserUsername(username);
		Optional<Profile> profile2Opt= profileRepo.findById(id);
		if(profile2Opt.isPresent()) {
			Profile profile2=profile2Opt.get();
		Optional<Star> starOpt= starRepo.findByMatcherAndMatched(profile1, profile2);
		if(starOpt.isPresent()) {
			star=starOpt.get();
			return star;
		}
		starOpt= starRepo.findByMatcherAndMatched(profile2, profile1);
		if(starOpt.isPresent()) {
			star=starOpt.get();
			return star;
		}
		}
		return star;
	}

	@Override
	public boolean destroy(String username, int id) {
		boolean deleted=false;
		
		return deleted;
	}


	@Override
	public List<Profile> findByUser(String username) {
		Profile profile=profileRepo.findByUserUsername(username);
		List<Profile> profilesMatched= new ArrayList<Profile>();
//		List<Star> starsMatched=starRepo.findByMatched(profile);
//		List<Star> starsMatcher=starRepo.findByMatcher(profile);
		List<Star> starsMatched=starRepo.findByMatchedAndBlocked(profile, false);
		List<Star> starsMatcher=starRepo.findByMatcherAndBlocked(profile, false);
		
		for(Star starMatched : starsMatched) {
			profilesMatched.add(starMatched.getMatcher());
		}
		for(Star starMatcher : starsMatcher) {
			profilesMatched.add(starMatcher.getMatched());
		}
		
		return profilesMatched;
	}
	

}
