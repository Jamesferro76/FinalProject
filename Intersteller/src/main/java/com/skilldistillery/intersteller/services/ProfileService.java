package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Profile;

public interface ProfileService {

	List<Profile> findAll(String username);

	Profile findById(int id);

	Profile create(String name, Profile profile);

	Profile update(String name, int id, Profile profile);

	boolean destroy(String name, int id);

	List<Profile> findBySex(String sex);

	List<Profile> findByPrefence(int preferenceId);

	List<Profile> findBySexAndPreference(String sex, int preferenceId);

	List<Profile> findByState(String state);

	List<Profile> findByAge(int min, int max);

	List<Profile> findBySexPreferenceStateAge(String sex, int preferenceId, String state, int min, int max);

}
