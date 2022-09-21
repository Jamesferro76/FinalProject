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

class MixerAttendeeTest {
	
	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private MixerAttendee mixerattendee;

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
		MixerAttendeeId maid = new MixerAttendeeId();
		maid.setMixerId(1);
		maid.setProfileId(1);
		mixerattendee = em.find(MixerAttendee.class, maid);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		mixerattendee = null;
	}

	@Test
	void test_User_entity_mapping() {
		assertNotNull(mixerattendee);
		assertEquals(5, mixerattendee.getRating());
	}
	
	@Test
	void test_User_Mixer_entity_mapping() {
		assertNotNull(mixerattendee);
		assertEquals("mixer test", mixerattendee.getMixer().getName());
	}
	@Test
	void test_User_Profile_entity_mapping() {
		assertNotNull(mixerattendee);
		assertEquals("Male", mixerattendee.getProfile().getSex());
	}

}
