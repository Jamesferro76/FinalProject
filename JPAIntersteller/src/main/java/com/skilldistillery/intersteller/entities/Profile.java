package com.skilldistillery.intersteller.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Profile {
	
	@Id
	  @GeneratedValue(strategy= GenerationType.IDENTITY)
	  private int id;

	  private LocalDate birthday;

	  private String description;

	  private String sex;

	  @Column(name="first_name")
	  private String firstName;

	  @Column(name="last_name")
	  private String lastName;

	  @OneToOne
	  @JoinColumn(name="user_id")
	  private User user;

	  @OneToOne
	  @JoinColumn(name="address_id")
	  private Address address;

	  @Column(name="profile_pic")
	  private String profilePic;

	  private boolean active;

	  @CreationTimestamp
	  @Column(name="created_on")
	  private LocalDateTime createdOn;

	  @UpdateTimestamp
	  @Column(name="updated_on")
	  private LocalDateTime updatedOn;


	  @ManyToMany
	  @JoinTable(name= "profile_has_preference", joinColumns=@JoinColumn(name="profile_id"), inverseJoinColumns=@JoinColumn(name="preference_id"))
	  private List<Preference> preferences;
//
//	  @OneToMany(mappedBy="profile")
//	  private List<Image> images;
//
	  @OneToMany(mappedBy="profile")
	  private List<Mixer> mixers;
//
//	  @OneToMany(mappedBy="profile")
//	  private List<MixerAttendee> mixersAttending;
//
	  @OneToMany(mappedBy="sender")
	  private List<Message> messagesSent;

	  @OneToMany(mappedBy="recipient")
	  private List<Message> messagesReceived;
//
//	  @OneToMany(mappedBy="matcher")
//	  private List<Friend> matchers;
//
//	  @OneToMany(mappedBy="matched")
//	  private List<Friend> matcheds;
//
//	  //there is an extra connection from profile to friend that I'm not sure about
//
//	  @ManyToMany(mappedBy="favoriter")
//	  @JoinTable(name="favorite", 
//	  joinColumns={@JoinColumn(name="profile_id")}, 
//	  inverseJoinColumns={@JoinColumn(name="profile_id1")})
//	  private List<Profile> favorited;
//
//	  @ManyToMany(mappedBy="favorited")
//	  @JoinTable(name="favorite", 
//	  joinColumns={@JoinColumn(name="profile_id1")}, 
//	  inverseJoinColumns={@JoinColumn(name="profile_id")})
//	  private List<Profile> favoriter;
//
//	  @OneToMany(mappedBy="profile")
//	  private List<ProfileAnswer> profileAnswers;
//
//	  @ManyToMany
//	  @JoinTable(name="profile_has_category",
//	  joinColumns={@JoinColumn(name="profile_id")},
//	  inverseJoinColumns={@JoinColumn(name="category_id")})
//	  private List<Category> categories;
	  
		public Profile() {
			super();
		}


		public int getId() {
			return id;
		}


		public void setId(int id) {
			this.id = id;
		}


		public LocalDate getBirthday() {
			return birthday;
		}


		public void setBirthday(LocalDate birthday) {
			this.birthday = birthday;
		}


		public String getDescription() {
			return description;
		}


		public void setDescription(String description) {
			this.description = description;
		}


		public String getSex() {
			return sex;
		}


		public void setSex(String sex) {
			this.sex = sex;
		}


		public String getFirstName() {
			return firstName;
		}


		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}


		public String getLastName() {
			return lastName;
		}


		public void setLastName(String lastName) {
			this.lastName = lastName;
		}


		public User getUser() {
			return user;
		}


		public void setUser(User user) {
			this.user = user;
		}


		public Address getAddress() {
			return address;
		}


		public void setAddress(Address address) {
			this.address = address;
		}


		public String getProfilePic() {
			return profilePic;
		}


		public void setProfilePic(String profilePic) {
			this.profilePic = profilePic;
		}


		public boolean isActive() {
			return active;
		}


		public void setActive(boolean active) {
			this.active = active;
		}


		public LocalDateTime getCreatedOn() {
			return createdOn;
		}


		public void setCreatedOn(LocalDateTime createdOn) {
			this.createdOn = createdOn;
		}


		public LocalDateTime getUpdatedOn() {
			return updatedOn;
		}


		public void setUpdatedOn(LocalDateTime updatedOn) {
			this.updatedOn = updatedOn;
		}
		
		public List<Message> getMessagesSent() {
			return messagesSent;
		}


		public void setMessagesSent(List<Message> messagesSent) {
			this.messagesSent = messagesSent;
		}


		public List<Message> getMessagesReceived() {
			return messagesReceived;
		}


		public void setMessagesReceived(List<Message> messagesReceived) {
			this.messagesReceived = messagesReceived;
		}
		

		public List<Preference> getPreferences() {
			return preferences;
		}


		public void setPreferences(List<Preference> preferences) {
			this.preferences = preferences;
		}


		public List<Mixer> getMixers() {
			return mixers;
		}


		public void setMixers(List<Mixer> mixers) {
			this.mixers = mixers;
		}

//		public List<Profile> getFavorited() {
//			return favorited;
//		}
//
//
//		public void setFavorited(List<Profile> favorited) {
//			this.favorited = favorited;
//		}
//
//
//		public List<Profile> getFavoriter() {
//			return favoriter;
//		}
//
//
//		public void setFavoriter(List<Profile> favoriter) {
//			this.favoriter = favoriter;
//		}


		@Override
		public int hashCode() {
			return Objects.hash(active, address, birthday, createdOn, description, firstName, id, lastName, profilePic,
					sex, updatedOn, user);
		}


		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Profile other = (Profile) obj;
			return active == other.active && Objects.equals(address, other.address)
					&& Objects.equals(birthday, other.birthday) && Objects.equals(createdOn, other.createdOn)
					&& Objects.equals(description, other.description) && Objects.equals(firstName, other.firstName)
					&& id == other.id && Objects.equals(lastName, other.lastName)
					&& Objects.equals(profilePic, other.profilePic) && Objects.equals(sex, other.sex)
					&& Objects.equals(updatedOn, other.updatedOn) && Objects.equals(user, other.user);
		}


		@Override
		public String toString() {
			return "Profile [birthday=" + birthday + ", description=" + description + ", firstName=" + firstName
					+ ", lastName=" + lastName + "]";
		}
		
		

}
