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

class StarTest {
	
	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private Star star;

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
		star = em.find(Star.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		star = null;
	}

	@Test
	void test_Star_entity_mapping() {
		assertNotNull(star);
	}
	
	@Test
	void test_Star_Profile_entity_mapping() {
		assertNotNull(star);
		assertEquals(1, star.getMatcher().getId());
	}

}
