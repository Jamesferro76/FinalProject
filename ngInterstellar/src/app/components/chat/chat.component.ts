import { ChatMessageDto } from './../../models/chatMessageDto';
import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
loginUser: any;

  constructor(public webSocketService: WebSocketService, private userServ: UserService, private auth: AuthService,     private profileService: ProfileService,
    ) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm)
  {
const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
this.webSocketService.sendMessage(chatMessageDto);
    console.log(sendForm.value);
  }



}
