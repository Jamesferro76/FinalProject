package com.skilldistillery.intersteller.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Question{

@Id
@GeneratedValue( strategy =GenerationType.IDENTITY)
private int id;

private String question;

@OneToMany(mappedBy="question")
private List<Answer> answers;

@ManyToMany
@JoinTable(name="profile_answer", 
joinColumns=@JoinColumn(name="question_id"), 
inverseJoinColumns=@JoinColumn(name="profile_id"))
private List<Profile> profiles;

@OneToMany(mappedBy="question")
private List<ProfileAnswer> profileAnswer;



public Question() {
	super();
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getQuestion() {
	return question;
}

public void setQuestion(String question) {
	this.question = question;
}

public List<Answer> getAnswers() {
	return answers;
}

public void setAnswers(List<Answer> answers) {
	this.answers = answers;
}



public List<Profile> getProfiles() {
	return profiles;
}

public void setProfiles(List<Profile> profiles) {
	this.profiles = profiles;
}

public List<ProfileAnswer> getProfileAnswer() {
	return profileAnswer;
}

public void setProfileAnswer(List<ProfileAnswer> profileAnswer) {
	this.profileAnswer = profileAnswer;
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
	Question other = (Question) obj;
	return id == other.id;
}

@Override
public String toString() {
	StringBuilder builder = new StringBuilder();
	builder.append("Question [id=");
	builder.append(id);
	builder.append(", question=");
	builder.append(question);
	builder.append(", answers=");
	builder.append(answers);
	builder.append("]");
	return builder.toString();
}





}
