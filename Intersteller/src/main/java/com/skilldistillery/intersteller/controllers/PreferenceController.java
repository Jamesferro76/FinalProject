package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Preference;
import com.skilldistillery.intersteller.services.PreferenceService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class PreferenceController {
	
	@Autowired
	private PreferenceService preferenceService;
	
	@GetMapping("preferences")
	public List<Preference> findAllPreference(Principal principal){
		return preferenceService.findAll();
	}
	
	@GetMapping("preferences/{pname}")
	public Preference findByName(@PathVariable String pname){
		return preferenceService.findByName(pname);
	}

}
