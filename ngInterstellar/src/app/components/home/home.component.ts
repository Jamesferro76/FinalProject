import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StarService } from 'src/app/services/star.service';
import { Star } from 'src/app/models/star';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  newUser: User = new User();

  loginUser: User = new User();

  loggedInUser: User|null=null;

  loginProfile: Profile|null=null;

  selected: Profile|null=null;

  randomProfiles: Profile[]=[];

  star: Star= new Star();

  profileIndex:number=0;

  outOfMatches: boolean=false;

  defaultImageUrl: string="https://s3.envato.com/files/158241052/1.jpg";

  registerP: boolean = false;


  constructor(private userServ: UserService, private starService: StarService, private profileService: ProfileService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
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
  }



  loggedIn(){
    return this.auth.checkLogin();
  }

  register(user: User): void {
    console.log('Registering user:');
    this.userServ.register(user).subscribe({
      next: (registeredUser) => {
        this.loginUser = registeredUser;
        this.auth.login(user.username, user.password).subscribe({
          next: (loggedInUser: any) => {
            console.log('success');
            console.log(loggedInUser);
            this.loggedInUser=loggedInUser;


            this.router.navigateByUrl('profile');
          },
          error: (problem: any) => {
            console.error('RegisterComponent.register(): Error logging in user:');
            console.error(problem);
          }
        });
      },
      error: (fail) => {
        console.error('RegisterComponent.register(): Error registering account');
        console.error(fail);
      }
    });
  }




  login(user: User) {
    this.auth.login(user.username, user.password).subscribe({
      next: (loggedInUser: any) => {
        this.loggedInUser=loggedInUser
        console.log(loggedInUser);
        // this.ngOnInit()
        this.router.navigateByUrl('search');
      },
      error: (problem: any) => {
        console.error('LoginComponent.login(): Error logging in user:');
        console.error(problem);
      },
    });
  }

  logout(){
    console.log("logout");
    this.auth.logout();
    this.router.navigateByUrl('home');

    }




}
