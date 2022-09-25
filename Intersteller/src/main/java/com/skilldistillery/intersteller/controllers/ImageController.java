package com.skilldistillery.intersteller.controllers;

import java.security.Principal;

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

import com.skilldistillery.intersteller.entities.Image;
import com.skilldistillery.intersteller.services.ImageService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class ImageController {
	
	@Autowired
	private ImageService imageService;
	
	@GetMapping("images/{id}")
	public Image findByUrl(@PathVariable int id) {
		return imageService.findById(id);
	}
	
	@PostMapping("images")
	public Image createImage(@RequestBody Image image, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Image created = null;
		
		try {
			created= imageService.create(principal.getName(), image);
			res.setStatus(201);
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return created;
	}
	
	@DeleteMapping("images/{id}")
	public boolean deleteImage(@PathVariable int id, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		boolean deleted=imageService.destroy(principal.getName(), id);
		if(deleted) {
			res.setStatus(204);
		}else {
			res.setStatus(404);
		}
		return deleted;
	}
	
	


}
