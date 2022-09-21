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

class ProfileTest {
	
	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private Profile profile;

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
		profile = em.find(Profile.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		profile = null;
	}

	@Test
	void test_Profile_entity_mapping() {
		assertNotNull(profile);
		assertEquals("Admin", profile.getFirstName());
	}
	
	@Test
	void test_Profile_User_entity_mapping() {
		assertNotNull(profile);
		assertEquals(1, profile.getUser().getId());
	}
	
	@Test
	void test_Profile_Address_entity_mapping() {
		assertNotNull(profile);
		assertEquals(1, profile.getAddress().getId());
	}
	
	@Test
	void test_Profile_MessageSent_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getMessagesSent().size()>0);
	}
	@Test
	void test_Profile_MessageReveived_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getMessagesReceived().size()>0);
	}
	
	@Test
	void test_Profile_Mixer_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getMixers().size()>0);
	}
	
	@Test
	void test_Profile_Preference_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getPreferences().size()>0);
	}
	
	@Test
	void test_Profile_MixerAttendee_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getMixersAttending().size()>0);
	}
	
	@Test
	void test_Profile_Images_entity_mapping() {
		profile = em.find(Profile.class, 2);
		assertNotNull(profile);
		assertTrue(profile.getImages().size()>0);
	}
	
	@Test
	void test_Profile_Star_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getMatchers().size()>0);
		
		profile = em.find(Profile.class, 2);
		assertTrue(profile.getMatcheds().size()>0);
	}
	
	@Test
	void test_Profile_Star_Blocked_entity_mapping() {
		profile = em.find(Profile.class, 2);
		assertNotNull(profile);
		assertTrue(profile.getBlocked().size()>0);
	}
	
	@Test
	void test_Profile_Category_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getCategories().size()>0);
	}
	
	@Test
	void test_Profile_profileAnswer_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getProfileAnswers().size()>0);
	}
	
	@Test
	void test_Profile_Favoriter_entity_mapping() {
		profile = em.find(Profile.class, 4);
		assertNotNull(profile);
		assertTrue(profile.getFavoriter().size()>0);
	}
	@Test
	void test_Profile_Favorited_entity_mapping() {
		assertNotNull(profile);
		assertTrue(profile.getFavorited().size()>0);
	}
	

}
