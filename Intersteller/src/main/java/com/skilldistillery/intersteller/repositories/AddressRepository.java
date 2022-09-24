package com.skilldistillery.intersteller.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Address;
import com.skilldistillery.intersteller.entities.Profile;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	List<Address> findByState(String state);



}
