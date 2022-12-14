package com.skilldistillery.intersteller.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Preference {
	
	@Id  
	@GeneratedValue( strategy =GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="profile_has_preference", 
	joinColumns=@JoinColumn(name="preference_id"), 
	inverseJoinColumns=@JoinColumn(name="profile_id"))
	private List<Profile> profiles;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Preference() {
		super();
	}

	public List<Profile> getProfiles() {
		return profiles;
	}

	public void setProfiles(List<Profile> profiles) {
		this.profiles = profiles;
	}
	
	
	

}
