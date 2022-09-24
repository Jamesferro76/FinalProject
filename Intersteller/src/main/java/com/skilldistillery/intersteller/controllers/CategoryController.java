package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.Category;
import com.skilldistillery.intersteller.services.CategoryService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("categories")
	public List<Category> findAllPreference(Principal principal){
		return categoryService.findAll();
	}
	
	@GetMapping("categories/{cname}")
	public Category findByName(@PathVariable String cname){
		return categoryService.findByName(cname);
	}

}
