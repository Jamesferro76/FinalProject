import { Image } from './../../models/image';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Profile } from './../../models/profile';
import { Preference } from 'src/app/models/preference';
import { PreferenceService } from 'src/app/services/preference.service';

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

  preference:Preference=new Preference();

  selectedPrefs=[
    false,
    false,
    false,
    false,
    false,
  ]

  constructor(
    private profileService: ProfileService,
    private preferenceService: PreferenceService,
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
      updateProfile.preferences=[];
      console.log("Outside the if statement outside the for loop"+this.selectedPrefs);
      for(let i=0; i<this.selectedPrefs.length;i++){
        console.log("Outside the if statement in the for loop"+this.selectedPrefs[i]);
        if(this.selectedPrefs[i]){
          updateProfile.preferences.push(this.findPreferenceByName(this.prefs[i]));

          for(let i=0; i<updateProfile.preferences.length; i++){
      console.log(updateProfile.preferences[i]);
    }
        }
        // else if(!this.selectedPrefs[i]&&updateProfile.preferences.includes(this.prefs[i]))
        //   updateProfile.preferences.splice(i,1);
      }
    }

    for(let i=0; i<updateProfile.preferences.length; i++){
      console.log(updateProfile.preferences[i]);
    }


    this.profileService.updateProfile(updateProfile).subscribe(
      {
      next: (result)=>{
        console.log("Inside update Profile");
        for(let i=0; i<result.preferences.length; i++){
          console.log(result.preferences[i]);
        }
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

findPreferenceByName(pref:string){
  this.preferenceService.findByName(pref).subscribe(
    {
    next: (result)=>{
      console.log(result);

      this.preference=result;
      return this.preference;
    },
    error:(err)=>{
      console.error('ProfileComponent.findPreferenceByName(): error finding Preference: ');
      console.error(err);
    }
    }
  );
}

}


