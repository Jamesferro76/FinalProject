package com.skilldistillery.intersteller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.User;

public interface MixerRepository extends JpaRepository<User, Integer> {

	User getUserById(int userId);
	User findByUsername(String username);

}
