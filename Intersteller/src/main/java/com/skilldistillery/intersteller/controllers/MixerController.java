package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Set;

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

import com.skilldistillery.intersteller.entities.Mixer;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.services.MixerService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class MixerController {
	
	@Autowired
	private MixerService mixerServe;
	
	@GetMapping("mixers")
	public List<Mixer> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		
		return mixerServe.index(principal.getName());

	}
	
	@GetMapping("mixers/{id}")
	public Mixer findById(@PathVariable int id, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		
		Mixer mixer = mixerServe.findById(principal.getName(),id);
		if(mixer ==null) {
			res.setStatus(404);
		}
		return mixer;
	}
	@PostMapping("mixers")
	public Mixer createMixer(@RequestBody Mixer mixer, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Mixer created = null;
		
		try {
			created= mixerServe.create(principal.getName(), mixer);
			res.setStatus(201);
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return created;
	}
	@PutMapping("mixers/{tid}")
	public Mixer updateMixer(@RequestBody Mixer mixer, @PathVariable int tid, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Mixer updated= null;
		
		try {
			updated= mixerServe.update(principal.getName(), tid, mixer);
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		
		return updated;
	}
	
	@DeleteMapping("mixers/{id}")
	public boolean deleteMixer(@PathVariable int id, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		boolean deleted=mixerServe.destroy(principal.getName(), id);
		if(deleted) {
			res.setStatus(204);
		}else {
			res.setStatus(404);
		}
		return deleted;
	}

}
