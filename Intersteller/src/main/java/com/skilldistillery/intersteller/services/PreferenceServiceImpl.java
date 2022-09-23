package com.skilldistillery.intersteller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Preference;
import com.skilldistillery.intersteller.repositories.PreferenceRepository;

@Service
public class PreferenceServiceImpl implements PreferenceService {
	
	@Autowired
	private PreferenceRepository preferenceRepo;

	@Override
	public List<Preference> findAll() {
		List<Preference> preferences= preferenceRepo.findAll();
		return preferences;
	}

	@Override
	public Preference findByName(String pname) {
		Preference pref=null;
		 Optional<Preference> prefOpt=preferenceRepo.findByName(pname);
		 if(prefOpt.isPresent()) {
			 pref=prefOpt.get();
				 return pref;
		 }
		return null;
	}

}
