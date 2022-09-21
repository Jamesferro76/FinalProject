package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Mixer;
import com.skilldistillery.intersteller.services.MixerService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class MixerController {
	
	@Autowired
	private MixerService mixerServe;
	
	@GetMapping("mixers")
	public List<Mixer> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
	//	return todoServe.index(username);
		
		return mixerServe.index(principal.getName());

	}

}
