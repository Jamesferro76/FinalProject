package com.skilldistillery.intersteller.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Message {
	
	@Id
	  @GeneratedValue(strategy= GenerationType.IDENTITY)
	  private int id;

	  private String content;

	  @CreationTimestamp
	  private LocalDateTime sendDate;

	  @ManyToOne
	  @JoinColumn(name="sender_id")
	  private Profile sender;

	  @ManyToOne
	  @JoinColumn(name="recipient_id")
	  private Profile recipient;

	public Message() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getSendDate() {
		return sendDate;
	}

	public void setSendDate(LocalDateTime sendDate) {
		this.sendDate = sendDate;
	}

	public Profile getSender() {
		return sender;
	}

	public void setSender(Profile sender) {
		this.sender = sender;
	}

	public Profile getRecipient() {
		return recipient;
	}

	public void setRecipient(Profile recipient) {
		this.recipient = recipient;
	}

	@Override
	public int hashCode() {
		return Objects.hash(content, id, recipient, sendDate, sender);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Message other = (Message) obj;
		return Objects.equals(content, other.content) && id == other.id && Objects.equals(recipient, other.recipient)
				&& Objects.equals(sendDate, other.sendDate) && Objects.equals(sender, other.sender);
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", content=" + content + ", sendDate=" + sendDate + "]";
	}
	  
	

}
