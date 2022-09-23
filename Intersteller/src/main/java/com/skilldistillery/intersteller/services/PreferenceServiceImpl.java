package com.skilldistillery.intersteller.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.intersteller.entities.Preference;
import com.skilldistillery.intersteller.repositories.PreferenceRepository;

public class PreferenceServiceImpl implements PreferenceService {
	
	@Autowired
	private PreferenceRepository preferenceRepo;

	@Override
	public List<Preference> findAll() {
		List<Preference> preferences= preferenceRepo.findAll();
		return preferences;
	}

}
