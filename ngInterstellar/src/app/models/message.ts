import { Profile } from "./profile";

export class Message {
id: number;
content: string;
sentDate: number;
sender: Profile;
recipient: Profile;

constructor(id: number,
  content: string,
  sentDate: number,
  sender: Profile,
  recipient: Profile){
this.id = id;
this.content = content;
this.sentDate = sentDate;
this.sender = sender;
this.recipient = recipient;
}
}
