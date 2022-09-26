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

  defaultImageUrl: string="https://s3.envato.com/files/158241052/1.jpg";


  constructor(private userServ: UserService, private starService: StarService, private profileService: ProfileService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.findAllProfiles()
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
        this.loggedInUser=loggedInUser
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
        this.randomProfiles=profiles
        this.selectRandomProfile();
      },
      error: (problem: any) => {
        console.error('HomeComponent.findAllProfiles(): Error FindAllProfiles failed:');
        console.error(problem);
      },
    });
  }

  selectRandomProfile(){
    this.profileIndex=Math.floor(Math.random()*this.randomProfiles.length);
    this.selected=this.randomProfiles[this.profileIndex];
    if(!this.selected.profilePic){
      this.selected.profilePic=this.defaultImageUrl;
    }
    if(this.selected.images.length<1){
        this.selected.images.push(new Image(0, this.selected.profilePic));
    }
  }

  likedAProfile(){
    console.log("Inside LikeAProfile");

    if(this.loginProfile&&this.selected){
      console.log(this.loginProfile);
      console.log(this.loggedInUser)
      console.log(this.loginProfile.favorited);
      if(!this.loginProfile.favorited){
        this.loginProfile.favorited=[];
      }
      // this.loginProfile.favorited.push(this.selected);
      this.loginProfile=this.updateProfile(this.selected.id);

      this.checkForMatch();
      this.randomProfiles.splice(this.profileIndex, 1);
      this.selectRandomProfile();

    }else{
      console.log("this.loginProfile"+this.loginProfile);
      console.log("this.selected"+this.selected);

    }
  }

  checkForMatch(){
    console.log("You made it to checkForMatch. This doesn't work yet");

    if(this.loginProfile&&this.selected){

      this.profileService.checkFavorited(this.selected.id).subscribe({
        next: (result) => {
          console.log(result);
          if(this.loginProfile&&this.selected){
            this.star.matcher=this.loginProfile;
          this.star.matched=this.selected;
            this.createStar();
          }
        },
        error: (err) => {
          console.error('Error checkForMatch');
          console.error(err);
        },
      });
    }
  }

    createStar(){
        this.starService.create(this.star).subscribe({
          next: (result) => {
            //Make a message pop up that you have a match
            console.log(result);
          },
          error: (err) => {
            console.error('Error creating match');
            console.error(err);
          },
        });
    }


  getLogginProfile(){
    console.log("In getLogginProfile");
    console.log("this.loginUser"+this.loginUser.id);


    this.profileService.findByUserId(this.loginUser.id).subscribe({
      next: (profile) => {
        this.loginProfile = profile;
        console.log("this.loginProfile"+this.loginProfile);
        console.log("Results: "+profile);


      },
      error: (err) => {
        console.error('Error retrieving Profile');
        console.error(err);
      },
    });
  }

  updateProfile(likedProfileId: number){
    console.log("In updateProfile likedProfileId"+likedProfileId);

    this.profileService.addFavorited(likedProfileId).subscribe({
      next: (result) => {
        return result;
      },
      error: (err) => {
        console.error(
          'HomeComponent.UpdateProfile(): error Updating Profile: '
          );
          console.error(err);
          return this.loginProfile;
      },
    });
    return this.loginProfile;
  }


}
