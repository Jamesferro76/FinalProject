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

class ImageTest {

	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private Image image;

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
		image = em.find(Image.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		image = null;
	}

	@Test
	void test_Image_entity_mapping() {
		assertNotNull(image);
		assertEquals("https://live.staticflickr.com/65535/50022047712_239c407207.jpg", image.getImageUrl());
		assertEquals(2,image.getProfile().getId());
	}
	

}
