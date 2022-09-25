package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Image;
import com.skilldistillery.intersteller.entities.Mixer;
import com.skilldistillery.intersteller.entities.Profile;

public interface ImageService {

	Image create(String name, Image image);

	Image findByUrl(String url);

	Image findById(int id);

	boolean destroy(String username, int id);
   

}
