package com.skilldistillery.intersteller.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.Star;

public interface StarRepository extends JpaRepository<Star, Integer> {


	List<Star> findByMatched(Profile profile);

	List<Star> findByMatcher(Profile profile);

	Optional<Star> findByMatcherAndMatched(Profile profile1, Profile profile2);



}
