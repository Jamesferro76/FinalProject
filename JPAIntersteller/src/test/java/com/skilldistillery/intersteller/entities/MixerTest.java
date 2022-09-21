package com.skilldistillery.intersteller.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MixerTest {
	
	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private Mixer mixer;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAIntersteller");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		mixer = em.find(Mixer.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		mixer = null;
	}

	@Test
	void test_Mixer_entity_mapping() {
		assertNotNull(mixer);
		assertEquals("admin", mixer.getName());
	}
	@Test
	void test_Mixer_mixerattendee_mapping() {
		assertNotNull(mixer);
		assertEquals("admin", mixer);
	}

}
