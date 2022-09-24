package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Address;

public interface AddressService {

	Address create(String name, Address address);

	Address findById(int id);

	Address update(String name, Address address);

	List<Address> findAll();

	Address findByProfile(String string);


}
