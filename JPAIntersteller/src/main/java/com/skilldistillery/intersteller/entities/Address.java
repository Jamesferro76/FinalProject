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
	
//	@OneToOne(mappedBy="address")               
//	private Profile profile;
	
	@OneToOne(mappedBy="address")
	private Mixer mixer;

	
	
	public Address() {
	super();
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

	public Mixer getMixer() {
		return mixer;
	}

	public void setMixer(Mixer mixer) {
		this.mixer = mixer;
	}
	
	
	
}
