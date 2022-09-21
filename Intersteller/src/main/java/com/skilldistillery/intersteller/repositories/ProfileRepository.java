package com.skilldistillery.intersteller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {

	Profile findByIdAndUserId(int id, int userId);
}
