import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  webSocket!: WebSocket;
  chatMessages: Message[]=[];

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8090/chat');
    this.webSocket.onopen = (event) => {
      console.log('Open: ' + event)

    };
    this.webSocket.onmessage = (event) => {
    const chatMessage= JSON.parse(event.data);
    this.chatMessages.push(chatMessage);
  };

  this.webSocket.onclose = (event) => {
    console.log('Close: ' + event);
  };
}

public sendMessage(chatMessage: Message){
  this.webSocket.send(JSON.stringify(chatMessage));
}

public closeWebSocket(){
this.webSocket.close();
}
}
