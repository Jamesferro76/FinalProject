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

class MessageTest {

private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private Message message;

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
		message = em.find(Message.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		message = null;
	}

	@Test
	void test_Message_entity_mapping() {
		assertNotNull(message);
		assertEquals("admin", message.getContent());
	}
	
	@Test
	void test_Message_Sender_entity_mapping() {
		assertNotNull(message);
		assertEquals(1, message.getSender().getId());
	}
	
	@Test
	void test_Message_Recipient_entity_mapping() {
		assertNotNull(message);
		assertEquals(2, message.getRecipient().getId());
	}

}
