package com.skilldistillery.intersteller.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity
public class Star {
	
	@EmbeddedId
	private StarId id;
	
	@ManyToOne
	@JoinColumn(name="matcher_id")
	@MapsId(value="matcherId")
	private Profile matcher;
	
	@ManyToOne
	@JoinColumn(name="matched_id")
	@MapsId(value="matchedId")
	private Profile matched;

}
