import { User } from "./user";

export class ChatMessageDto{
  user: User;
  message: string;

  constructor(user: User= new User(), message: string){
    this.user = user;
    this.message = message;
  }
}
