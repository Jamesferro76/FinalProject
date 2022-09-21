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

class ProfileAnswerTest {
	
	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private ProfileAnswer profileanswer;

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
		ProfileAnswerId paid = new ProfileAnswerId();
		paid.setQuestionId(1);
		paid.setProfileId(1);
		profileanswer = em.find(ProfileAnswer.class, paid);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		profileanswer = null;
	}

	@Test
	void test_User_entity_mapping() {
		assertNotNull(profileanswer);
		assertEquals(5, profileanswer.getRating());
	}
	
	@Test
	void test_User_Question_entity_mapping() {
		assertNotNull(profileanswer);
		assertEquals("mixer test", profileanswer.getMixer().getName());
	}
	@Test
	void test_User_Profile_entity_mapping() {
		assertNotNull(profileanswer);
		assertEquals("Male", profileanswer.getProfile().getSex());
	}

}
