package com.skilldistillery.intersteller.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class MixerAttendeeId implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Column(name="mixer_id")
	private int mixerId;
	
	@Column(name="profile_id")
	private int profileId;

	public int getMixerId() {
		return mixerId;
	}

	public void setMixerId(int mixerId) {
		this.mixerId = mixerId;
	}

	public int getProfileId() {
		return profileId;
	}

	public void setProfileId(int profileId) {
		this.profileId = profileId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public MixerAttendeeId() {
		super();
	}

	@Override
	public int hashCode() {
		return Objects.hash(mixerId, profileId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MixerAttendeeId other = (MixerAttendeeId) obj;
		return mixerId == other.mixerId && profileId == other.profileId;
	}
	
	
	
	

}
