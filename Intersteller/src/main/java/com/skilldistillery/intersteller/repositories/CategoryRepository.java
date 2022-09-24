package com.skilldistillery.intersteller.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

	Optional<Category> findByName(String pname);


}
