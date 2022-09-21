package com.skilldistillery.intersteller.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PreferenceTest {
	
	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private Preference preference;

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
		preference = em.find(Preference.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		preference = null;
	}

	@Test
	void test_Preference_entity_mapping() {
		assertNotNull(preference);
		assertEquals("admin", preference.getName());
	}
	@Test
	void test_Preference_profile_mapping() {
		assertNotNull(preference);
		assertEquals("admin", preference.getProfiles().get(0).getFirstName());
		assertTrue(preference.getProfiles().size()>0);
	}

}
