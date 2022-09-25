package com.skilldistillery.intersteller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Image;
import com.skilldistillery.intersteller.entities.Profile;

public interface ImageRepository extends JpaRepository<Image, Integer> {

	Image findByImageUrl(String url);

	Image findByIdAndProfile(int id, Profile profile);



}
