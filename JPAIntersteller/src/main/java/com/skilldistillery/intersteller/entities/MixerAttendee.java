package com.skilldistillery.intersteller.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name="mixer_attendee")
public class MixerAttendee {

	@EmbeddedId
	private MixerAttendeeId id;
	
	@ManyToOne
	@JoinColumn(name="mixer_id")
	@MapsId(value="mixerId")
	private Mixer mixer;
	
	@ManyToOne
	@JoinColumn(name="profile_id")
	@MapsId(value="profileId")
	private Profile profile;
	
	private int rating;
	
	@Column(name="rating_comment")
	private String ratingComment;
	
	@Column(name="rating_date")
	private LocalDateTime ratingDate;


	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getRatingComment() {
		return ratingComment;
	}

	public void setRatingComment(String ratingComment) {
		this.ratingComment = ratingComment;
	}

	public LocalDateTime getRatingDate() {
		return ratingDate;
	}

	public void setRatingDate(LocalDateTime ratingDate) {
		this.ratingDate = ratingDate;
	}

	public MixerAttendeeId getId() {
		return id;
	}

	public void setId(MixerAttendeeId id) {
		this.id = id;
	}

	public Mixer getMixer() {
		return mixer;
	}

	public void setMixer(Mixer mixer) {
		this.mixer = mixer;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public MixerAttendee() {
		super();
	}
	
	
	
}
