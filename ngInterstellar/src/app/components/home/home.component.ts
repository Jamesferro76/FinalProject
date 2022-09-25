import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  newUser: User = new User();

  loginUser: User = new User();

  loginProfile: Profile|null=null;

  selected: Profile|null=null;


  constructor(private userServ: UserService, private profileService: ProfileService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.findAllProfiles()
    this.getLogginProfile();
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


            this.router.navigateByUrl('/home');
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
        console.log(loggedInUser);
        this.router.navigateByUrl('home');
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

    counterForPic:number=0;
  selectPicForward(images:Image[]){
    this.counterForPic++;
    if(this.counterForPic>=images.length){
    this.counterForPic=0;
    }
  }
  selectPicBackward(images:Image[]){
    this.counterForPic--;
    if(this.counterForPic<0){
    this.counterForPic=images.length-1;
    }
  }

  findAllProfiles(){
    this.profileService.findAll().subscribe({
      next: (profiles) => {
        this.selectRandomProfile(profiles);
      },
      error: (problem: any) => {
        console.error('HomeComponent.findAllProfiles(): Error FindAllProfiles failed:');
        console.error(problem);
      },
    });
  }

  selectRandomProfile(profiles: Profile[]){
    this.selected=profiles[Math.floor(Math.random()*profiles.length)];
  }

  likedAProfile(){
    if(this.loginProfile&&this.selected){
      this.loginProfile.favorited.push(this.selected);
      // this.loginProfile=this.updateProfile(this.loginProfile);
      this.selected.favoriter.push(this.loginProfile);
      // this.selected=this.updateProfile(this.selected);



    }
  }

  checkForMatch(){
    // if(this.loginProfile&&this.selected){
    // const match= this.loginProfile.favoriter.find( ({id})=>{
    //  id===this.selected.id);
    // }
    // }
    // Look into how to find an element of an array. Then create a match
  }

  getLogginProfile(){
    this.profileService.findByUserId(this.loginUser.id).subscribe({
      next: (profile) => {
        this.loginProfile = profile;
      },
      error: (err) => {
        console.error('Error retrieving Profile');
        console.error(err);
      },
    });
  }

  updateProfile(updateProfile:Profile){
    this.profileService.updateProfile(updateProfile).subscribe({
      next: (result) => {
        return result;
      },
      error: (err) => {
        console.error(
          'HomeComponent.UpdateProfile(): error Updating Profile: '
        );
        console.error(err);
      },
    });
  }


}
