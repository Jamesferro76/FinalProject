import { StarService } from 'src/app/services/star.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from './../services/profile.service';
import { Message } from 'src/app/models/message';
import { ChatService } from './../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Profile } from '../models/profile';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-inter-chat',
  templateUrl: './inter-chat.component.html',
  styleUrls: ['./inter-chat.component.css']
})
export class InterChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollBottom')
  private scrollBottom!: ElementRef;



loginProfile: Profile = new Profile();

loggedInUser: User = new User();

selected: User | null = null;

sent: Message | null = null;

newMessage = new Message();

chatHistory: Message [] =[];



ChatService: any;

msg ='';




  constructor(
    private http: HttpClient,
     private auth: AuthService,
     public chatService: ChatService,
     private profileService: ProfileService,
     private user:UserService,
     private router: Router,
     private starServ: StarService
    ) { }


    ngAfterViewChecked() {
      this.scrollToBottom();
     }

     scrollToBottom(): void {
         try {
             this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
         } catch(err) { }
     }

     handleKeyUp(e: { keyCode: number; }){
      if(e.keyCode === 13){
         this.handleSubmit(e);
      }
   }

   handleSubmit(e: { keyCode?: number; preventDefault?: any; }){
    e.preventDefault();
    alert(this.msg);
  }


  ngOnInit(): void {
    this.chatService.openWebSocket();

    this.reload();

    this.scrollToBottom();

    setInterval(() => {
      this.display();
      console.log();
    }, 4000);

  }

  ngOnDestroy(): void {
    this.chatService.closeWebSocket();

  }

  refresh(): void {
    location.reload();
}

  display():void{
    this.chatLog();
  }


  reload():void {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);

        this.loggedInUser = user;
      },
      error: (err) => {
        console.error('Error retrieving User');
        console.error(err);

      },
    });

  }

  chatLog(){
if(this.selected != null){

  this.chatService.index(this.selected).subscribe({
    next: (messages) => {
      this.chatHistory = messages;
      console.log('component.ts' + this.chatHistory);

    },
    error: (prob) => {
      console.error('InterChatComponet.reload(): error loading messages');
      console.error(prob);
    }
  });
}
  }





  addMessage(){
    this.newMessage.sender = this.loggedInUser;
    console.log('sender:' + this.loggedInUser.username)
    console.log('content:' + this.newMessage.content)

    if(this.selected != null){
      this.newMessage.recipient= this.selected;
      console.log('recipient:' + this.selected.username)
    }


    this.chatService.create(this.newMessage).subscribe({
      next: (result) => {
        console.log(result)
        this.display();
        this.newMessage.content = '';
      },
      error: (prob) => {
        console.error('ChatComponent.addMessage(): error sending message:');
        console.error(prob);
      },
    })
  }



}
