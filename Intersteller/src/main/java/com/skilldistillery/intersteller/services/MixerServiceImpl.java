package com.skilldistillery.intersteller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Mixer;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.MixerRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;
@Service
public class MixerServiceImpl implements MixerService {

	 @Autowired
	 private MixerRepository mixerRepo;
	 
	 @Autowired
	 private UserRepository userRepo;
	 
	@Override
	public List<Mixer> index(String username) {
		  return mixerRepo.findAll();
	}

	@Override
	public Mixer show(String username, int mid) {
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
		  if (user != null) {
		    Profile profile = user.getProfile();
		    mixer.setProfile(profile);
		    return mixerRepo.saveAndFlush(mixer);
		  }
		  return null;
	}

	@Override
	public Mixer update(String username, int mid, Mixer mixer) {
		  Mixer updated = show(username,mid);
		  
		  updated.setAddress(mixer.getAddress());
		  
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean destroy(String username, int mid) {
			Mixer mixer = show(username,mid);
			mixerRepo.deleteById(mixer.getId());
	        return ! mixerRepo.existsById(mixer.getId());
	}

}
