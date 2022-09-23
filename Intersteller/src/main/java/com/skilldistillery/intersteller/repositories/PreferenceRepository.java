package com.skilldistillery.intersteller.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Preference;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {

	Optional<Preference> findByName(String pname);


}
