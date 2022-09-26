import { UserService } from 'src/app/services/user.service';
import { ProfileService } from './../services/profile.service';
import { Message } from 'src/app/models/message';
import { ChatService } from './../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-inter-chat',
  templateUrl: './inter-chat.component.html',
  styleUrls: ['./inter-chat.component.css']
})
export class InterChatComponent implements OnInit, OnDestroy {

loginProfile: Profile|null=null;

loggedInUser: User|null=null;

selected: Message | null = null;

sent: Message | null = null;

newMessage = new Message();

messages: Message[]=[];
ChatService: any;




  constructor(
    private http: HttpClient,
     private auth: AuthService,
     public chatService: ChatService,
     private profileService: ProfileService,
     private user:UserService,
     private router: Router
    ) { }




  ngOnInit(): void {
    this.chatService.openWebSocket();

    this.reload();

  }

  ngOnDestroy(): void {
    this.chatService.closeWebSocket();
  }


  reload():void {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);

        this.loggedInUser = user;
        this.profileService.findByUserId(this.loggedInUser.id).subscribe({
          next: (profile) => {
            this.loginProfile = profile;
          },
          error: (err) => {
            console.error('Error retrieving Profile');
            console.error(err);
            this.router.navigateByUrl('profile');
          },
        });
      },
      error: (err) => {
        console.error('Error retrieving User');
        console.error(err);

      },
    });

    this.chatService.index().subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (prob) => {
        console.error('InterChatComponet.reload(): error loading messages');
        console.error(prob);
      }
    })
  }



  addMessage(){
    this.chatService.create(this.newMessage).subscribe({
      next: (result) => {
        console.log(result)
        const newMessage = new Message();
        this.messages = [];
        this.messages.push(newMessage);
        this.reload();
      },
      error: (prob) => {
        console.error('ChatComponent.addMessage(): error sending message:');
        console.error(prob);
      },
    })
  }



}
