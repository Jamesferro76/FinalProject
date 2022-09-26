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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.Star;
import com.skilldistillery.intersteller.services.StarService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class StarController {
	
	@Autowired
	private StarService starService;
	
	@GetMapping("stars")
	public List<Profile> findByUser(Principal principal) {
		return starService.findByUser(principal.getName());
	}
	
	@GetMapping("stars/{id}")
	public Star findSpecificStar(@PathVariable int id,Principal principal){
		return starService.findSpecificStar(id, principal.getName());
	}
	
	@PostMapping("stars")
	public Star createStar(@RequestBody Star star, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Star created = null;
		
		try {
			created= starService.create(principal.getName(), star);
			res.setStatus(201);
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(401);
		}
		return created;
	}
	
	@DeleteMapping("stars/{id}")
	public boolean deleteImage(@PathVariable int id, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		boolean deleted=starService.destroy(principal.getName(), id);
		if(deleted) {
			res.setStatus(204);
		}else {
			res.setStatus(404);
		}
		return deleted;
	}
	
	


}
