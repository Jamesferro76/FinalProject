package com.skilldistillery.intersteller.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Answer {

	
	@Id
	@GeneratedValue( strategy =GenerationType.IDENTITY)
	private int id;
	
	private String answer;
	
	@ManyToOne
	@JoinColumn(name="question_id")
	private Question question;
	
	@ManyToOne
	@JoinColumn(name="category_id")
	private Category category;

	  @OneToMany(mappedBy="answer")
	  private List<ProfileAnswer> profileAnswers;
	  
	public Answer() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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
		Answer other = (Answer) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Answer [id=");
		builder.append(id);
		builder.append(", answer=");
		builder.append(answer);
		builder.append(", category=");
		builder.append(category);
		builder.append("]");
		return builder.toString();
	}
	
	
}
