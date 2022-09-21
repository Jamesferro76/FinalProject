package com.skilldistillery.intersteller.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class StarId implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Column(name="matcher_id")
	private int matcherId;
	
	@Column(name="matched_id")
	private int matchedId;

	public StarId() {
		super();
	}

	public StarId(int matcherId, int matchedId) {
		super();
		this.matcherId = matcherId;
		this.matchedId = matchedId;
	}

	public int getMatcherId() {
		return matcherId;
	}

	public void setMatcherId(int matcherId) {
		this.matcherId = matcherId;
	}

	public int getMatchedId() {
		return matchedId;
	}

	public void setMatchedId(int matchedId) {
		this.matchedId = matchedId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(matchedId, matcherId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		StarId other = (StarId) obj;
		return matchedId == other.matchedId && matcherId == other.matcherId;
	}

	@Override
	public String toString() {
		return "StarId [matcherId=" + matcherId + ", matchedId=" + matchedId + "]";
	}
	
	

}
