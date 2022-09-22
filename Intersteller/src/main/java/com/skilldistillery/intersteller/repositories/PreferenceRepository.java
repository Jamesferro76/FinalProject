package com.skilldistillery.intersteller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Preference;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {


}
