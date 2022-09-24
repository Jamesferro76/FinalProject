package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Address;
import com.skilldistillery.intersteller.services.AddressService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class AddressController {
	
	@Autowired
	private AddressService addressService;
	
	@GetMapping("addresses/{id}")
	public Address findByUrl(@PathVariable int id) {
		return addressService.findById(id);
	}
	
	@GetMapping("addresses")
	public List<Address> findAll() {
		return addressService.findAll();
	}
	
	@GetMapping("addresses/profile")
	public Address findByProfile(Principal principal) {
		return addressService.findByProfile(principal.getName());
	}
	
	@PostMapping("addresses")
	public Address createAddress(@RequestBody Address address, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Address created = null;
		
		try {
			created= addressService.create(principal.getName(), address);
			res.setStatus(201);
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return created;
	}
	
	@PutMapping("addresses")
	public Address updateAddress(@RequestBody Address address, HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Address updated= null;
		
		try {
			updated= addressService.update(principal.getName(), address);
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		
		return updated;
	}
	


}
