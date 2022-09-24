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
  loggedInUser: User = new User();
  selected: Profile | null = null;

  constructor(
    public messageService: MessageService,
    private userServ: UserService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.messageService.openWebSocket();

    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        this.profileService.findByUserId(this.loggedInUser.id).subscribe({
          next: (profile) => {
            this.selected = profile;
          },
          error: (err) => {
            console.error('Error retrieving Profile');
            console.error(err);
            this.router.navigateByUrl('NotFound');
          },
        });
      },
      error: (err) => {
        console.error('Error retrieving User');
        console.error(err);
        this.router.navigateByUrl('NotFound');
      },
    });
  }

  ngOnDestroy(): void {
    this.messageService.closeWebSocket();
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

}
