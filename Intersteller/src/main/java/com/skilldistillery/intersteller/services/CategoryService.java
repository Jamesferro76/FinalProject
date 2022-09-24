package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Category;

public interface CategoryService {

	List<Category> findAll();

	Category findByName(String pname);

	
}
