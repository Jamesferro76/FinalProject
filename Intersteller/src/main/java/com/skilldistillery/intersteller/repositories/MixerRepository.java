package com.skilldistillery.intersteller.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.intersteller.entities.Mixer;

public interface MixerRepository extends JpaRepository<Mixer, Integer> {

	Mixer getMixerById(int mixerId);
//	Mixer findByUsername(String username);
//	Set<Mixer> findByMixer_Username(String username);

}
