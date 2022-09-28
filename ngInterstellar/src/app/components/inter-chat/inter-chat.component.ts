import { StarService } from 'src/app/services/star.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from '../../services/profile.service';
import { Message } from 'src/app/models/message';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Profile } from '../../models/profile';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-inter-chat',
  templateUrl: './inter-chat.component.html',
  styleUrls: ['./inter-chat.component.css'],
})
export class InterChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollBottom')
  private scrollBottom!: ElementRef;

  loginProfile: Profile = new Profile();

  loggedInUser: User = new User();

  selected: User | null = null;


  sent: Message | null = null;

  newMessage = new Message();

  chatHistory: Message[] = [];

  ChatService: any;

  matches: Profile[] = [];

  msg = '';

  id: number = 0;

  switch=false;

  chatter: Profile = new Profile();

  reason: string= '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    public chatService: ChatService,
    private profileService: ProfileService,
    private user: UserService,
    private router: Router,
    private starServ: StarService
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop =
        this.scrollBottom.nativeElement.scrollHeight;
    } catch (err) {}
  }

  chatref=setInterval(() => {
   this.display();
   console.log();
 }, 1000);

  ngOnInit(): void {
    this.chatService.openWebSocket();

    this.reload();


    this.scrollToBottom();


  }

  ngOnDestroy(): void {
    if(true){
      clearInterval(this.chatref);
    }
    this.chatService.closeWebSocket();
  }

  toProfilePage(id: number){
    this.router.navigateByUrl('profile/'+id);
  }

  display(): void {
    this.findUserByProfile(this.id);
  }



  reload(): void {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);
        this.loggedInUser = user;
        this.getMatches();
      },
      error: (err) => {
        console.error('Error retrieving User');
        console.error(err);
      },
    });
  }

  findUserByProfile(id: number){
    console.log(id);

   this.chatService.profile(id).subscribe({
      next: (profile) => {
        console.log(profile);
        this.selected = profile;
        this.chatLog();

      },
      error: (err) => {
        console.error('Error retrieving matches');
        console.error(err);
      },
    });
  }

  getMatches(){
    this.starServ.findByUser().subscribe({
      next: (profile) => {
        console.log(profile);
        this.matches = profile;
      },
      error: (err) => {
        console.error('Error retrieving matches');
        console.error(err);
      },
    });

  }

  chatLog() {
    if (this.selected != null) {
      this.chatService.index(this.selected).subscribe({
        next: (messages) => {
          this.chatHistory = messages;
          console.log('component.ts' + this.chatHistory);
        },
        error: (prob) => {
          console.error('InterChatComponet.reload(): error loading messages');
          console.error(prob);
        },
      });
    }
  }

  addMessage() {
    this.newMessage.sender = this.loggedInUser;
    console.log('sender:' + this.loggedInUser.username);
    console.log('content:' + this.newMessage.content);

    if (this.selected != null) {
      this.newMessage.recipient = this.selected;
      console.log('recipient:' + this.selected.username);
    }

    this.chatService.create(this.newMessage).subscribe({
      next: (result) => {
        console.log(result);
        this.display();
        this.newMessage.content = '';
      },
      error: (prob) => {
        console.error('ChatComponent.addMessage(): error sending message:');
        console.error(prob);
      },
    });
  }

  block(){
    console.log("Inside block id:"+ this.id);
    console.log(this.reason);
    if(this.reason==''){
      this.reason="Blocked";
    }

    this.starServ.update(this.id, this.reason).subscribe({
      next: (result) => {
        this.reason="";
        this.getMatches();
        this.display();
        // this.newMessage.content = '';
      },
      error: (prob) => {
        console.error('ChatComponent.block(): error sending message:');
        console.error(prob);
      },
    });
  }
}
