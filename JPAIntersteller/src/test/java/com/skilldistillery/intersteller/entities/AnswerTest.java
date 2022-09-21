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

class AnswerTest {

	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private Answer answer;

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
		answer = em.find(Answer.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		answer = null;
	}

	@Test
	void test_Answer_entity_mapping() {
		assertNotNull(answer);
		assertEquals("Quality time", answer.getAnswer());
		assertEquals(5, answer.getCategory().getId());
	}
	

}
