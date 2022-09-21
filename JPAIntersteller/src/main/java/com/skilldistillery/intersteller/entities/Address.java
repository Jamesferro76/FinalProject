package com.skilldistillery.intersteller.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Address {
	
	@Id  
	@GeneratedValue( strategy =GenerationType.IDENTITY)
	private int id;
	
	private String street;
	
	private String city;
	
	private String state;
	
	private String zip;
	
	private String country;
	
	@OneToOne(mappedBy="address")               
	private Profile profile;
	
	@OneToOne(mappedBy="address")
	private Mixer mixer;
	
}
