package com.skilldistillery.intersteller.entities;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String content;

//	@Column(name = "message_from")
//	private int messageFrom;
//
//	@Column(name = "message_to")
//	private int messageTo;

	@Column(name = "sent_date")
	private Date sendDate;

	@ManyToOne
	@JoinColumn(name = "message_from")
	private User sender;

	@ManyToOne
	@JoinColumn(name = "message_to")
	private User recipient;

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

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public User getRecipient() {
		return recipient;
	}

	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}

//	public int getMessageFrom() {
//		return messageFrom;
//	}
//
//	public void setMessageFrom(int messageFrom) {
//		this.messageFrom = messageFrom;
//	}
//
//	public int getMessageTo() {
//		return messageTo;
//	}
//
//	public void setMessageTo(int messageTo) {
//		this.messageTo = messageTo;
//	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
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
		Message other = (Message) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Message [id=");
		builder.append(id);
		builder.append(", content=");
		builder.append(content);
		builder.append(", sendDate=");
		builder.append(sendDate);
		builder.append(", sender=");
		builder.append(sender);
		builder.append(", recipient=");
		builder.append(recipient);
		builder.append("]");
		return builder.toString();
	}

	

}
