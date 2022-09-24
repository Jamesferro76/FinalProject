package com.skilldistillery.intersteller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Category;
import com.skilldistillery.intersteller.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepo;

	@Override
	public List<Category> findAll() {
		List<Category> categorys = categoryRepo.findAll();
		return categorys;
	}

	@Override
	public Category findByName(String cname) {
		Category pref = null;
		Optional<Category> prefOpt = categoryRepo.findByName(cname);
		if (prefOpt.isPresent()) {
			pref = prefOpt.get();
			return pref;
		}
		return null;
	}

}
