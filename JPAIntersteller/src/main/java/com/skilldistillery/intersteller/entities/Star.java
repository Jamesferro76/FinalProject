package com.skilldistillery.intersteller.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
	
	@CreationTimestamp
	@Column(name="matched_on")
	private LocalDateTime matchedOn;
	
	private boolean blocked;
	
	@ManyToOne
	@JoinColumn(name="blocked_by_id")
	private Profile blockedBy;
	
	@UpdateTimestamp
	@Column(name="blocked_date")
	private LocalDateTime blocked_date;
	
	@Column(name="blocked_reason")
	private String blockedReason;

	public Star() {
		super();
	}

	public StarId getId() {
		return id;
	}

	public void setId(StarId id) {
		this.id = id;
	}

	public Profile getMatcher() {
		return matcher;
	}

	public void setMatcher(Profile matcher) {
		this.matcher = matcher;
	}

	public Profile getMatched() {
		return matched;
	}

	public void setMatched(Profile matched) {
		this.matched = matched;
	}

	public LocalDateTime getMatchedOn() {
		return matchedOn;
	}

	public void setMatchedOn(LocalDateTime matchedOn) {
		this.matchedOn = matchedOn;
	}

	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	public Profile getBlockedBy() {
		return blockedBy;
	}

	public void setBlockedBy(Profile blockedBy) {
		this.blockedBy = blockedBy;
	}

	public LocalDateTime getBlocked_date() {
		return blocked_date;
	}

	public void setBlocked_date(LocalDateTime blocked_date) {
		this.blocked_date = blocked_date;
	}

	public String getBlockedReason() {
		return blockedReason;
	}

	public void setBlockedReason(String blockedReason) {
		this.blockedReason = blockedReason;
	}

	@Override
	public int hashCode() {
		return Objects.hash(blocked, blockedBy, blockedReason, blocked_date, id, matched, matchedOn, matcher);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Star other = (Star) obj;
		return blocked == other.blocked && Objects.equals(blockedBy, other.blockedBy)
				&& Objects.equals(blockedReason, other.blockedReason)
				&& Objects.equals(blocked_date, other.blocked_date) && Objects.equals(id, other.id)
				&& Objects.equals(matched, other.matched) && Objects.equals(matchedOn, other.matchedOn)
				&& Objects.equals(matcher, other.matcher);
	}

	@Override
	public String toString() {
		return "Star [id=" + id + ", matcher=" + matcher + ", matched=" + matched + ", matchedOn=" + matchedOn
				+ ", blocked=" + blocked + "]";
	}
	
	

}
