import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  loginUser: User = new User();
  editedUser: User | null = null;
  adminUser: User = new User();
  loginProfile: Profile | null = null;
  users: User[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);

        this.loginUser = user;
        this.editedUser = user;
        this.profileService.findByUserId(this.loginUser.id).subscribe({
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
    this.reload();
  }

  updateLogin(user: User) {
    console.log(user);
    console.log(user.username);
    console.log(user.password);

    this.userService.update(user).subscribe({
      next: (updatedUser) => {
        if (user.username != null) {
          this.loginUser = updatedUser;
          console.log(this.loginUser);
        }
        this.reLogin();
      },
      error: (err) => {
        console.error(
          'HomeComponent.UpdateProfile(): error Updating Profile: '
        );
      },
    });
    console.log(this.loginUser.password);
  }
  reLogin() {
    console.log('in reload' + this.loginUser.password);
    if (this.editedUser != null) {
      this.auth
        .login(this.editedUser.username, this.editedUser.password)
        .subscribe({
          next: (loggedInUser: any) => {
            this.editedUser = null;
            this.loginUser = loggedInUser;
            console.log(loggedInUser);
            this.ngOnInit();
          },
          error: (problem: any) => {
            console.error('LoginComponent.login(): Error logging in user:');
            console.error(problem);
          },
        });
    }
  }

  reload(): void {
    this.userService.index().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
      },
      error: (problem) => {
        console.error('MixerHttpComponent.reload(): error loading mixer:');
        console.error(problem);
      },
    });
  }
  adminUpdate(user: User) {
    console.log(user);
    console.log(user.username);
    console.log(user.password);
    console.log(user.active);

    this.userService.update(user).subscribe({
      next: (updatedUser) => {},
      error: (err) => {
        console.error(
          'HomeComponent.UpdateProfile(): error Updating Profile: '
        );
      },
    });
  }
}
