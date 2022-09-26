import { MessageService } from './../../services/message.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  loginProfile: Profile|null=null;

  loggedInUser: User = new User ();
  messages: Message[] = [];
  sentMessages: Message [] = [];
  receivedMessages: Message [] = [];
  selected: Message | null = null;
  newMessage: Message = new Message();
  usernames: string[] = [];
  sendingMessage: boolean = false;
  viewingInbox: boolean = true;
  viewingSent: boolean = false;
  closeResult = '';
  activeTab: string = 'inbox';
  messageToDelete: Message = new Message();
  unreadMessageCount: number = 0;

  constructor(
    public messageService: MessageService,
    private userService: UserService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.messageService.openWebSocket();
    this.reload();

    this.authService.getLoggedInUser().subscribe({
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
  }
  //   this.userService.getAllUsernames().subscribe(
  //     usernames => {
  //       this.usernames = usernames;
  //     },
  //     fail => {
  //       console.log('Invalid User ');
  //     }
  //   );
  // }



  ngOnDestroy(): void {
    this.messageService.closeWebSocket();
  }

  reload(){
    this.messageService.index().subscribe(
      data => {
        this.messages = data;
        data.forEach( (message) => {
          if (message.recipient.id === this.loggedInUser.id) {
            this.receivedMessages.push(message);
          }
          if (message.sender.id === this.loggedInUser.id) {
            this.sentMessages.push(message);
          }

          // this.messageService.getMessageCount();

        });
      },
      err => {
        console.error('Error getting messages from service: ' + err);
      }
    );
  }

  displaySingleMessage(message: Message): void {
    this.selected = message;
  }

  displayAllMessages(): void {
    this.selected = null;
    this.reload();
  }

  displayNewMessage(): void {
    this.selected = null;
    this.sendingMessage = true;
  }


  sendMessage(sendForm: NgForm) {
    const chatMessage = new Message(
      sendForm.value.sender,
      sendForm.value.content,
      sendForm.value.recipient,
      sendForm.value.sentDate,
      sendForm.value.id,

    );


    this.messageService.sendMessage(chatMessage);
    console.log(sendForm.value);
  }

  // sendMessage(){
  //   this.messageService.sendMessage(this.newMessage).subscribe(
  //     data => {
  //       this.receivedMessages = [];
  //       this.sentMessages = [];
  //       this.reload();
  //     },
  //     error =>{
  //       console.log(error);
  //       console.log("Error");
  //     }
  //   );
  //   this.newMessage = new Message();
  // }
  // }

}
