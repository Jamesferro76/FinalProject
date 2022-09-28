package com.skilldistillery.intersteller.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Address;
import com.skilldistillery.intersteller.entities.Preference;
import com.skilldistillery.intersteller.entities.Profile;
import com.skilldistillery.intersteller.entities.User;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {

	Profile findByIdAndUserId(int id, int userId);

	List<Profile> findBySex(String sex);

	List<Profile> findByPreferences(Preference preference);

	List<Profile> findBySexAndPreferences(String sex, Preference preference);

	List<Profile> findByAddress(Address address);

	List<Profile> findByAgeBetween(int min, int max);

	List<Profile> findBySexAndPreferencesAndAddressAndAgeBetween(String sex, Preference preference, Address address,
			int min, int max);

	Profile findByUser(User user);

	Profile findByUserUsername(String username);

	Profile findByIdAndFavorited(int id, Profile profile);

	List<Profile> findByActive(boolean b);
}
