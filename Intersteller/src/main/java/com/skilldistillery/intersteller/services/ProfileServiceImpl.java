package com.skilldistillery.intersteller.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Address;
import com.skilldistillery.intersteller.entities.Image;
import com.skilldistillery.intersteller.entities.Preference;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.AddressRepository;
import com.skilldistillery.intersteller.repositories.PreferenceRepository;
import com.skilldistillery.intersteller.repositories.ProfileRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class ProfileServiceImpl implements ProfileService {
	
	@Autowired
	private ProfileRepository profileRepo;
	
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private PreferenceRepository preferenceRepo;
	@Autowired
	private AddressRepository addressRepo;

	@Override
	public List<Profile> findAll(String username) {
//		List<Profile> profiles= profileRepo.findAll();
		List<Profile> profiles= profileRepo.findByActive(true);
		Profile prof = profileRepo.findByUserUsername(username);
		List<Profile> likedProfiles= prof.getFavorited();
		profiles.remove(prof);
		for(Profile pro: likedProfiles) {
			if(profiles.contains(pro)) {
				profiles.remove(pro);
			}
			
		}
		
		return profiles;
	}
	
	@Override
	public List<Profile> findAllIncludingInactive(String username) {
		Profile prof = profileRepo.findByUserUsername(username);
		if(prof.getActive()) {
			List<Profile> profiles= profileRepo.findAll();
			return profiles;
			
		}
			return null;
	}
	
	@Override
	public Profile findById(int id) {
		Profile profile=null;
		 Optional<Profile> profileOpt=profileRepo.findById(id);
		 if(profileOpt.isPresent()) {
			 profile=profileOpt.get();
				 return profile;
		 }
		return null;
	}
	
	@Override
	public Profile create(String username, Profile profile) {
		System.out.println("Top of create");
	  User user = userRepo.findByUsername(username);
	  System.out.println(user.getUsername());
	  if(profile.getProfilePic()==null||profile.getProfilePic().equals("")) {
		  profile.setProfilePic("https://s3.envato.com/files/158241052/1.jpg");
	  }
	  if (user != null) {
	    profile.setUser(user);
	    return profileRepo.saveAndFlush(profile);
	  }
	  return null;
	}
	
	@Override
	public Profile update(String username, int id, Profile profile) {
		Profile existing=null;
		Optional<Profile> existingOpt= profileRepo.findById(id);
		if(existingOpt.isPresent()) {
			existing=existingOpt.get();
			
			if(existing.getUser().getUsername().equals(username)) {
				
				if(profile.getFirstName()!=null) {
					existing.setFirstName(profile.getFirstName());
				}
				
				existing.setLastName(profile.getLastName());
				existing.setDescription(profile.getDescription());
				existing.setBirthday(profile.getBirthday());
				existing.setAge(profile.getAge());
				
				
				if(profile.getSex()!=null) {
					existing.setSex(profile.getSex());
				}
				existing.setCategories(profile.getCategories());
					existing.setPreferences(profile.getPreferences());
				
				if(profile.getAddress()!=null) {
					existing.setAddress(profile.getAddress());
				}
				if(profile.getProfilePic()!=null&&!profile.getProfilePic().equals("")) {
					existing.setProfilePic(profile.getProfilePic());
				}
				existing.setImages(profile.getImages());
				
				System.out.println(profile.getMixersAttending());
				System.out.println(existing.getMixersAttending());
				if(profile.getMixersAttending()!=null) {
					existing.setMixersAttending(profile.getMixersAttending());
				}
				
				
					existing.setImages(profile.getImages());
				
				
				existing.setFavorited(profile.getFavorited());
				profileRepo.save(existing);
				return existing;
			 }else {
				 List<Profile>favs=existing.getFavoriter();
				 User user = userRepo.findByUsername(username);
				 Profile userProfile=profileRepo.findByUser(user);
				favs.add(userProfile);
				profileRepo.save(existing);
				return existing;
			 }
		}
		return existing;
	}

	@Override
	public boolean destroy(String username, int id) {
		boolean deleted=false;
		System.out.println(username);
		User user = userRepo.findByUsername(username);
		System.out.println(user.getUsername());
		Profile profileToDelete=profileRepo.findByIdAndUserId(id, user.getId());
		System.out.println(profileToDelete.getFirstName());
		if(profileToDelete != null) {
			try {
				profileRepo.delete(profileToDelete);
				deleted=true;
			}catch(Exception e) {
				e.printStackTrace();
			}
			
		}
		return deleted;
	}

	@Override
	public List<Profile> findBySex(String sex) {
		List<Profile> results= profileRepo.findBySex(sex);
		return results;
	}

	@Override
	public List<Profile> findByPrefence(int preferenceId) {
		Optional<Preference> preferenceOpt=preferenceRepo.findById(preferenceId);
		Preference preference=null;
		 if(preferenceOpt.isPresent()) {
			 preference=preferenceOpt.get();
		 }
		 List<Profile> results=profileRepo.findByPreferences(preference);
		 return results;
	}

	@Override
	public List<Profile> findBySexAndPreference(String sex, int preferenceId) {
		Optional<Preference> preferenceOpt=preferenceRepo.findById(preferenceId);
		Preference preference=null;
		 if(preferenceOpt.isPresent()) {
			 preference=preferenceOpt.get();
		 }
		 List<Profile> results=profileRepo.findBySexAndPreferences(sex, preference);
		 return results;
}

	@Override
	public List<Profile> findByState(String state) {
		List<Profile> results= new ArrayList<Profile>();
		List<Address> addresses= addressRepo.findByState(state);
		for (Address address : addresses) {
			List<Profile> profiles= profileRepo.findByAddress(address);
			results.addAll(profiles);
		}
		return results;
	}

	@Override
	public List<Profile> findByAge(int min, int max) {
		List<Profile> results= profileRepo.findByAgeBetween(min, max);
		return results;
	}

	@Override
	public List<Profile> findBySexPreferenceStateAge(String sex, int preferenceId, String state, int min, int max) {
		Optional<Preference> preferenceOpt=preferenceRepo.findById(preferenceId);
		Preference preference=null;
		 if(preferenceOpt.isPresent()) {
			 preference=preferenceOpt.get();
		 }		
		 List<Profile> results= new ArrayList<Profile>();
			List<Address> addresses= addressRepo.findByState(state);
			for (Address address : addresses) {
				List<Profile> profiles= profileRepo.findBySexAndPreferencesAndAddressAndAgeBetween(sex, preference, address, min, max);
				results.addAll(profiles);
			}
			return results;
		
	}

	@Override
	public Profile findByUser(int id) {
		Optional<User> userOpt=userRepo.findById(id);
		User user=null;
		 if(userOpt.isPresent()) {
			 user=userOpt.get();
		 }		
		 Profile profile=profileRepo.findByUser(user);
		
		return profile;
	}

	@Override
	public Profile addFavorited(int id, String username) {
		
		Profile profile= profileRepo.findByUserUsername(username);
		Optional<Profile> liked= profileRepo.findById(id);
		if(liked.isPresent()) {
			Profile likedProfile=liked.get();
//			likedProfile.getFavoriter().add(profile);
			profile.getFavorited().add(likedProfile);
			profileRepo.save(profile);
		}
		
		return profile;
	}

	@Override
	public Profile checkFavorited(int id, String name) {
		Profile profile= profileRepo.findByUserUsername(name);
		return profileRepo.findByIdAndFavorited(id, profile);
		
	}
	
	public User findUserByProfile(int id) {
		Profile profile=null;
		Optional<Profile> profileOpt= profileRepo.findById(id);
		if(profileOpt.isPresent())
			profile=profileOpt.get();
		return profile.getUser();
	}
	
	
	
	
}
