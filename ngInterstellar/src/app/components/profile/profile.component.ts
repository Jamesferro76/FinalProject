import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Profile } from './../../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedInUser: User|null=null;
  selected: Profile|null=null;


  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.getLoggedInUser().subscribe({
      next:(user)=>{
        this.loggedInUser=user;
        this.profileService.findByUserId(this.loggedInUser.id).subscribe({
          next:(profile)=>{
            this.selected=profile;
          },
          error: (err)=>{
            console.error('Error retrieving Profile');
            console.error(err);
            this.router.navigateByUrl('NotFound');
          }
        })
      },
      error: (err)=>{
        console.error('Error retrieving User');
        console.error(err);
        this.router.navigateByUrl('NotFound');
      }
    })
  }

}
