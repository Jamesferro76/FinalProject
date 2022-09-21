package com.skilldistillery.intersteller.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
	
	@OneToMany(mappedBy="address")
	private List<Mixer> mixers;

	
	
	public List<Mixer> getMixers() {
		return mixers;
	}

	public void setMixers(List<Mixer> mixers) {
		this.mixers = mixers;
	}

	public Address() {
	super();
}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	
	
	
}
