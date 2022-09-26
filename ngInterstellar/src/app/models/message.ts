import { User } from 'src/app/models/user';
import { Profile } from "./profile";

export class Message {
id: number = 0;
content: string = '';
sender: any = null;
recipient: any = null;
sentDate: Date;

constructor(id: number,
  content: string = '',
  sender: any = null,
  recipient: any = null,
  sentDate: Date
  )
  {
this.id = id;
this.content = content;
this.sender = sender;
this.recipient = recipient;
this.sentDate = sentDate;
}
}
