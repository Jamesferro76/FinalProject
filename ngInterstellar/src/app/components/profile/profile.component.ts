import { Image } from './../../models/image';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Profile } from './../../models/profile';
import { Preference } from 'src/app/models/preference';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedInUser: User|null=null;
  selected: Profile|null=null;
  displayUpdate: boolean=false;
  editProfile: Profile|null=null;
  newProfile: Profile = new Profile();

  addImage: boolean=false;
  newImage: Image = new Image();

  preferences: Preference[]= [];
  prefs=[
    'Men',
    'Women',
    'Trans',
    'Pan',
    'Non-Binary'
  ]

  selectedPrefs=[
    false,
    false,
    false,
    false,
    false,
  ]

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
        this.router.navigateByUrl('home');
      }
    })
  }

  setEditProfile(){
    this.editProfile=Object.assign({}, this.selected);

    for(let i=0; i<this.editProfile.preferences.length; i++){
      let index=this.prefs.indexOf(this.editProfile.preferences[i].name);
      this.selectedPrefs[index]=true;
    }
    console.log(this.selectedPrefs);

  }

  cancelEdit(){
    this.editProfile=null;
  }

  addProfile(newProfile: Profile){
    this.profileService.createProfile(newProfile).subscribe(
      {
      next: (data)=>{
        this.newProfile= new Profile();
        this.selected=data;
        this.editProfile=null;
      },
      error:(err)=>{
        console.error('AddProfileComponent: error Loading profile: ');
        console.error(err);

      }
      }
    );

  }

  updateProfile(updateProfile: Profile){
    if(this.editProfile!=null){
      updateProfile.id=this.editProfile.id;
      for(let i=0; i<this.selectedPrefs.length;i++){
        if(this.selectedPrefs[i]&&!updateProfile.preferences.includes(this.prefs[i])){
          updateProfile.preferences.push(this.prefs[i]);
        }else if(!this.selectedPrefs[i]&&updateProfile.preferences.includes(this.prefs[i]))
          updateProfile.preferences.splice(i,1);
      }
    }



    this.profileService.updateProfile(updateProfile).subscribe(
      {
      next: (result)=>{
        console.log("Inside update Profile");
        console.log(result.images[0].imageUrl);

        this.selected=result;
        this.editProfile=null;
      },
      error:(err)=>{
        console.error('UpdateProfileComponent.UpdateProfile(): error Updating Profile: ');
        console.error(err);

      }
      }
    );
  }

  deleteProfile(){
    if(this.editProfile){
    this.editProfile.active=false;
    this.profileService.updateProfile(this.editProfile).subscribe(
      {
      next: (result)=>{
        this.selected=null;
        this.editProfile=null;
        this.authService.logout();
      },
      error:(err)=>{
        console.error('ProfileComponent.DeleteProfile(): error Deleting Profile: ');
        console.error(err);
      }
      }
    );
  }
}

addImageToProfile(){
  if(this.selected){
    this.newImage.profile=this.selected;
    this.selected.images.push(this.newImage);
    this.newImage=new Image();
    this.addImage=false;
    this.updateProfile(this.selected);
  }
}

}
