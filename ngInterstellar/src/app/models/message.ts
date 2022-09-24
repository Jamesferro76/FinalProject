import { Profile } from "./profile";

export class Message {
id: number;
content: string;
sender: number;
recipient: number;
sentDate?: number;

constructor(id: number,
  content: string,
  sender: number,
  recipient: number,
  sentDate?: number
  )
  {
this.id = id;
this.content = content;
this.sender = sender;
this.recipient = recipient;
this.sentDate = sentDate;
}
}
