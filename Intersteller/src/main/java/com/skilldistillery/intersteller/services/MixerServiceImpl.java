package com.skilldistillery.intersteller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Address;
import com.skilldistillery.intersteller.entities.Mixer;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.AddressRepository;
import com.skilldistillery.intersteller.repositories.MixerRepository;
import com.skilldistillery.intersteller.repositories.ProfileRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;
@Service
public class MixerServiceImpl implements MixerService {

	 @Autowired
	 private MixerRepository mixerRepo;
	 
	 @Autowired
	 private UserRepository userRepo;
	 
	 @Autowired
	 private ProfileRepository profileRepo;
	 
	 @Autowired
	 private AddressRepository addressRepo;
	 
	@Override
	public List<Mixer> index(String username) {
		  return mixerRepo.findAll();
	}

	@Override
	public Mixer findById(String username, int mid) {
		Optional<Mixer> mixerOpt = mixerRepo.findById(mid);
		Mixer mixer = null;
		if (mixerOpt.isPresent()) {
		  mixer = mixerOpt.get();
		  return mixer;
		}
		return mixer;
	
	}

	@Override
	public Mixer create(String username, Mixer mixer) {
		  User user = userRepo.findByUsername(username);
		  Profile profile = user.getProfiles().get(0);
		  mixer.setProfile(profile);
		  Address address =addressRepo.saveAndFlush(mixer.getAddress());
		  mixer.setAddress(address);
		   return mixerRepo.saveAndFlush(mixer);
	}

	@Override
	public Mixer update(String username, int mid, Mixer mixer) {
			Optional<Mixer> existingOpt= mixerRepo.findById(mid);
			if(existingOpt.isPresent()) {
				Mixer existing=existingOpt.get();
					existing.setName(mixer.getName());
					existing.setDescription(mixer.getDescription());
					existing.setEventDate(mixer.getEventDate());
					addressRepo.save(mixer.getAddress());
					existing.setAddress(mixer.getAddress());
					existing.setEventStart(mixer.getEventStart());
					existing.setEventEnd(mixer.getEventEnd());
					existing.setImageUrl(mixer.getImageUrl());
//					existing.setProfile(mixer.getProfile());	 Mixer.getProfile is null, dont use
					mixerRepo.save(existing);
					return existing;
				 }
		return null;
	}

	@Override
	public boolean destroy(String username, int mid) {
			Mixer mixer = findById(username,mid);
			mixerRepo.deleteById(mixer.getId());
	        return ! mixerRepo.existsById(mixer.getId());
	}

}
