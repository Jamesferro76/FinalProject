package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.Star;

public interface StarService {

	Star create(String name, Star star);

	List<Profile> findByUser(String username);

	Star findById(int id);

	boolean destroy(String username, int id);
   

}
