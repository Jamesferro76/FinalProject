package com.skilldistillery.intersteller.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Image;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.ImageRepository;
import com.skilldistillery.intersteller.repositories.ProfileRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class ImageServiceImpl implements ImageService {
	
	@Autowired
	private ImageRepository imageRepo;
	
	@Autowired
	private ProfileRepository profileRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Image create(String name, Image image) {
		User user = userRepo.findByUsername(name);
		if(user!=null) {
			Profile profile= profileRepo.findByUser(user);
			if(profile!=null) {
				image.setProfile(profile);
				return imageRepo.saveAndFlush(image);
			}
		}
		return null;
	}

	@Override
	public Image findByUrl(String url) {
		return imageRepo.findByImageUrl(url);
	}

	@Override
	public Image findById(int id) {
		Image image=null;
		Optional<Image> imageOpt= imageRepo.findById(id);
		if(imageOpt.isPresent()) {
			image=imageOpt.get();
		}
		return image;
	}

	

}
