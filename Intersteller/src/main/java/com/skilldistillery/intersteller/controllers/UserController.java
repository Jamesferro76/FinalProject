package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost"})
public class UserController {
	
	@Autowired
	private UserService userServ;
	
	@GetMapping("users")
	public List<User> index(Principal principal){
		List<User> users = userServ.index(principal.getName());
		return users;
	}
	
	

}
