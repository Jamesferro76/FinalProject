package com.skilldistillery.intersteller.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ProfileAnswerId  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Column(name="profile_id")
	private int profileId;
	
	@Column(name="question_id")
	private int questionId;

	public ProfileAnswerId() {
		super();
	}

	public int getProfileId() {
		return profileId;
	}

	public void setProfileId(int profileId) {
		this.profileId = profileId;
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(profileId, questionId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProfileAnswerId other = (ProfileAnswerId) obj;
		return profileId == other.profileId && questionId == other.questionId;
	}
	
	

	
}
