package com.skilldistillery.intersteller.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name="profile_answer")
public class ProfileAnswer {

	
	@EmbeddedId
	private ProfileAnswerId id;
	
	@ManyToOne
	@JoinColumn(name="question_id")
	@MapsId(value="questionId")
	private Question question;
	
	@ManyToOne
	@JoinColumn(name="profile_id")
	@MapsId(value="profileId")
	private Profile profile;
	
	@ManyToOne
	@JoinColumn(name="answer_id")
	private Answer answer;

	public ProfileAnswerId getId() {
		return id;
	}

	public void setId(ProfileAnswerId id) {
		this.id = id;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public Answer getAnswer() {
		return answer;
	}

	public void setAnswer(Answer answer) {
		this.answer = answer;
	}

	public ProfileAnswer() {
		super();
	}
	
	
}
