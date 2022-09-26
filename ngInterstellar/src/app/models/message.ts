import { User } from 'src/app/models/user';
import { Profile } from "./profile";

export class Message {
[x: string]: any;
id: number;
content: string;
sender: User;
recipient: User;
sentDate: String;

constructor(id: number = 0,
  content: string = '',
  sender: User = new User(),
  recipient:User = new User(),
  sentDate: string = ''
  )
  {
this.id = id;
this.content = content;
this.sender = sender;
this.recipient = recipient;
this.sentDate = sentDate;
}
}
