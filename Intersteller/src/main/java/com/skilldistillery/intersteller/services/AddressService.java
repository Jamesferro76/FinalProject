package com.skilldistillery.intersteller.services;

import com.skilldistillery.intersteller.entities.Address;
import com.skilldistillery.intersteller.entities.Profile;

public interface AddressService {

	Address create(String name, Address address);

	Address findById(int id);

	Address update(String name, Address address);


}
