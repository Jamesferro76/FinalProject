import { Profile } from "./profile";

export class User {
  id: number = 0;
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = '';
  active: boolean = true;
  profile: Profile = new Profile();
  messagesSent: any[];
  messagesReceived: any[];



  constructor(
    id: number = 0,
    username: string = '',
    password: string = '',
    email: string = '',
    role: string = '',
    active: boolean = true,
    profile: Profile = new Profile(),
    messagesSent: any[] = [],
    messagesReceived: any[] = []


  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.active = active;
    this.profile = profile;
    this.messagesSent = messagesSent;
    this.messagesReceived = messagesReceived;
  }
}

