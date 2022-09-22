package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Preference;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.services.ProfileService;

@RestController
@RequestMapping(path="api")
@CrossOrigin({"*", "http://localhost"})
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	@GetMapping("profiles")
	public List<Profile> findAllProfiles(Principal principal){
		return profileService.findAll(principal.getName());
	}
	
	@GetMapping("profiles/{id}")
	public Profile findById(@PathVariable int id, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		
		Profile profile=profileService.findById(id);
		if(profile ==null) {
			res.setStatus(404);
		}
		return profile;
	}
	
	@PostMapping("profiles")
	public Profile createTodo(@RequestBody Profile profile, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Profile created = null;
		
		try {
			created= profileService.create(principal.getName(), profile);
			res.setStatus(201);
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return created;
	}
	
	@PutMapping("profiles/{tid}")
	public Profile updateProfile(@RequestBody Profile profile, @PathVariable int tid, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Profile updated= null;
		
		try {
			updated= profileService.update(principal.getName(), tid, profile);
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		
		return updated;
	}
	
	@DeleteMapping("profiles/{id}")
	public boolean deleteProfile(@PathVariable int id, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		boolean deleted=profileService.destroy(principal.getName(), id);
		if(deleted) {
			res.setStatus(204);
		}else {
			res.setStatus(404);
		}
		return deleted;
	}
	
	@GetMapping("profiles/sex/{sex}")
	public List<Profile> findBySex(@PathVariable String sex, Principal principal){
		return profileService.findBySex(sex);
	}
	
	@GetMapping("profiles/preference/{preferenceId}")
	public List<Profile> findBySex(@PathVariable int preferenceId, Principal principal){
		return profileService.findByPrefence(preferenceId);
	}
	
	@GetMapping("profiles/sex/{sex}/preference/{preferenceId}")
	public List<Profile> findBySexAndPreference(@PathVariable String sex, @PathVariable int preferenceId, Principal principal ){
		return profileService.findBySexAndPreference(sex, preferenceId);
	}
	
	@GetMapping("profiles/state/{state}")
	public List<Profile> findByState(@PathVariable String state, Principal principal){
		return profileService.findByState(state);
	}
	
	@GetMapping("profiles/age/{min}/{max}")
	public List<Profile> findByAge(@PathVariable int min, @PathVariable int max){
		return profileService.findByAge(min, max);
	}
	
	@GetMapping("profiles/sex/{sex}/preference/{preferenceId}/state/{state}/age/{min}/{max}")
	public List<Profile> findBySexPreferenceStateAge(@PathVariable String sex, @PathVariable int preferenceId, 
			@PathVariable String state, @PathVariable int min, @PathVariable int max, Principal principal){
		return profileService.findBySexPreferenceStateAge(sex, preferenceId, state, min, max);
	}
	

}
