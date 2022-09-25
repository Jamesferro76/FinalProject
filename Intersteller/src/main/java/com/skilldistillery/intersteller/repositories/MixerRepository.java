package com.skilldistillery.intersteller.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skilldistillery.intersteller.entities.Mixer;
import com.skilldistillery.intersteller.entities.MixerAttendee;

public interface MixerRepository extends JpaRepository<Mixer, Integer> {

	Mixer getMixerById(int mixerId);
//	Mixer findByUsername(String username);
//	Set<Mixer> findByMixer_Username(String username);
	

}
