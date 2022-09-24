package com.skilldistillery.intersteller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.intersteller.entities.Address;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.repositories.AddressRepository;
import com.skilldistillery.intersteller.repositories.ProfileRepository;
import com.skilldistillery.intersteller.repositories.UserRepository;

@Service
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	private AddressRepository addressRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ProfileRepository profileRepo;

	@Override
	public Address create(String name, Address address) {
		    
		    return addressRepo.saveAndFlush(address);
	}
	
	@Override
	public List<Address> findAll() {
		return addressRepo.findAll();
	}

	@Override
	public Address findById(int id) {
		Address address=null;
		Optional<Address> addressOpt= addressRepo.findById(id);
		if(addressOpt.isPresent()) {
			address=addressOpt.get();
		}
		return address;
	}
	
	@Override
	public Address findByProfile(String name) {
		User user= userRepo.findByUsername(name);
		Profile profile= profileRepo.findByUser(user);
		return profile.getAddress();
		
	}

	@Override
	public Address update(String name, Address address) {
		User user= userRepo.findByUsername(name);
		Profile profile= profileRepo.findByUser(user);
		Address existing=profile.getAddress();
		
		System.out.println("ExistingId: "+existing.getId());
		
			if(existing.getId()==address.getId()) {
				if(address.getStreet()!=null) {
					existing.setStreet(address.getStreet());
				}
				if(address.getCity()!=null) {
					existing.setCity(address.getCity());
				}
				if(address.getState()!=null) {
					existing.setState(address.getState());
				}
				if(address.getZip()!=null) {
					existing.setZip(address.getZip());
				}
				if(address.getCountry()!=null) {
					existing.setCountry(address.getCountry());
				}
				System.out.println(existing);
				addressRepo.save(existing);
				return existing;
			 }
		
		return null;
	}


}
