package com.skilldistillery.intersteller.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Image {
	
	@Id
	@GeneratedValue( strategy =GenerationType.IDENTITY)
	private int id;
	
	@Column(name="image_url")
	private String imageUrl;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="profile_id")
	private Profile profile;

	public Image() {
		super();
	}

	public Image(String profilePic) {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Image other = (Image) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Image [id=");
		builder.append(id);
		builder.append(", imageUrl=");
		builder.append(imageUrl);
		builder.append(", profile=");
		builder.append(profile);
		builder.append("]");
		return builder.toString();
	}
	
	
}
