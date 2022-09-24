package com.skilldistillery.intersteller.entities;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Message {
	
	  @Id
	  @GeneratedValue(strategy= GenerationType.IDENTITY)
	  private int id;

	  private String content;
	  
	  @Column(name="sender_id")
	  private int senderId;
	  
	  @Column(name="recipient_id")
	  private int recipientId;
	  
	  @Column(name="sent_date")
	  private Date sendDate;
	  
	  private String channel;
	  

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


	public int getSenderId() {
		return senderId;
	}


	public void setSenderId(int senderId) {
		this.senderId = senderId;
	}


	public int getRecipientId() {
		return recipientId;
	}


	public void setRecipientId(int recipientId) {
		this.recipientId = recipientId;
	}


	public Date getSendDate() {
		return sendDate;
	}


	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}


	public String getChannel() {
		return channel;
	}


	public void setChannel(String channel) {
		this.channel = channel;
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
		builder.append(", senderId=");
		builder.append(senderId);
		builder.append(", recipientId=");
		builder.append(recipientId);
		builder.append(", sendDate=");
		builder.append(sendDate);
		builder.append(", channel=");
		builder.append(channel);
		builder.append("]");
		return builder.toString();
	}
	
	

	
}
