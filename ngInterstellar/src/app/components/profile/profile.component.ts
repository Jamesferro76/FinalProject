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
import { ImageService } from 'src/app/services/image.service';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loggedInUser: User | null = null;
  selected: Profile | null = null;
  displayUpdate: boolean = false;
  editProfile: Profile | null = null;
  newProfile: Profile = new Profile();

  addImage: boolean = false;
  newImage: Image = new Image();
  editAddress: boolean = false;
  newAddress: Address= new Address();

  preferences: Preference[] = [];

  preference: Preference = new Preference();

  selectedPrefs = [false, false, false, false, false];

  constructor(
    private profileService: ProfileService,
    private imageService: ImageService,
    private addressService: AddressService,
    private preferenceService: PreferenceService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);

        this.loggedInUser = user;
        this.profileService.findByUserId(this.loggedInUser.id).subscribe({
          next: (profile) => {
            this.selected = profile;
            this.loadPreferences();
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
        this.router.navigateByUrl('home');
      },
    });
  }

  loadPreferences() {
    this.preferenceService.findAll().subscribe({
      next: (preferences) => {
        this.preferences = preferences;
      },
      error: (err) => {
        console.error('Error retrieving Preferences');
        console.error(err);
      },
    });
  }

  setEditProfile() {
    this.editProfile = Object.assign({}, this.selected);

    //   for(let i=0; i<this.editProfile.preferences.length; i++){
    //     let index=this.prefs.indexOf(this.editProfile.preferences[i].name);
    //     this.selectedPrefs[index]=true;
    //   }
    //   console.log(this.selectedPrefs);
  }

  cancelEdit() {
    this.editProfile = null;
  }

  prepProfile(){
    this.addAddressToProfile();
  }

  addProfile() {

    this.profileService.createProfile(this.newProfile).subscribe({
      next: (data) => {
        this.newProfile = new Profile();
        this.selected = data;
        this.editProfile = null;
      },
      error: (err) => {
        console.error('AddProfileComponent: error Loading profile: ');
        console.error(err);
      },
    });
  }

  updateProfile(updateProfile: Profile) {
    console.log(updateProfile);

    if (this.editProfile != null) {
      updateProfile.id = this.editProfile.id;
      //   updateProfile.preferences=[];
      //   for(let i=0; i<this.selectedPrefs.length;i++){
      //     console.log("Outside the if statement in the for loop"+this.selectedPrefs[i]);
      //     if(this.selectedPrefs[i]){
      //       updateProfile.preferences.push(this.findPreferenceByName(this.prefs[i]));

      //       for(let i=0; i<updateProfile.preferences.length; i++){
      //   console.log(updateProfile.preferences[i]);
      // }
      //     }
      //     console.log("This is the number of preferences in updateProfile:"+ updateProfile.preferences.length);

      // else if(!this.selectedPrefs[i]&&updateProfile.preferences.includes(this.prefs[i]))
      //   updateProfile.preferences.splice(i,1);
      // }
    }

    for (let i = 0; i < updateProfile.preferences.length; i++) {
      console.log(updateProfile.preferences[i]);
    }
    this.profileService.updateProfile(updateProfile).subscribe({
      next: (result) => {
        for (let i = 0; i < result.preferences.length; i++) {
          console.log(result.preferences[i]);
        }
        this.selected = result;

        this.editProfile = null;
      },
      error: (err) => {
        console.error(
          'UpdateProfileComponent.UpdateProfile(): error Updating Profile: '
        );
        console.error(err);
      },
    });
  }

  deleteProfile() {
    if (this.editProfile) {
      this.editProfile.active = false;
      this.profileService.updateProfile(this.editProfile).subscribe({
        next: (result) => {
          this.selected = null;
          this.editProfile = null;
          this.authService.logout();
        },
        error: (err) => {
          console.error(
            'ProfileComponent.DeleteProfile(): error Deleting Profile: '
          );
          console.error(err);
        },
      });
    }
  }

  addImageToProfile() {
    if (this.selected) {
      this.imageService.create(this.newImage).subscribe({
        next: (result) => {
          if (this.selected) {
            this.selected.images.push(result);
            this.newImage = new Image();
            this.addImage = false;
            this.updateProfile(this.selected);
          }
        },
        error: (err) => {
          console.error(
            'ProfileComponent.findPreferenceByName(): error finding Preference: '
          );
          console.error(err);
        },
      });
    }
  }

  addAddressToProfile() {
      this.addressService.create(this.newAddress).subscribe({
        next: (result) => {
          this.newProfile.address=result;
          console.log(this.newProfile.address);
          console.log("Results: "+result);

            this.newAddress = new Address();
            this.addProfile()
        },
        error: (err) => {
          console.error(
            'ProfileComponent.addAddressToProfile(): error creating address: '
          );
          console.error(err);
        },
      });
  }

  updateAddress(newAddress: Address) {
    console.log(newAddress);

    if (this.selected) {
      console.log(this.selected.address.id);
      newAddress.id=this.selected.address.id;
      console.log(newAddress);
      this.addressService.update(newAddress).subscribe({
        next: (result) => {
          if (this.selected) {
            this.selected.address=result;
            this.newAddress = new Address();
            this.editAddress=false;
            this.updateProfile(this.selected);
          }
        },
        error: (err) => {
          console.error(
            'ProfileComponent.updateAddress(): error updating Address: '
          );
          console.error(err);
        },
      });
    }
  }

  perf(perfPro: Profile) {
    if (this.editProfile != null) {

      // console.log("EditProfile.preferences Before"+this.editProfile.preferences);
      // console.log("perfPro.preferences"+ perfPro.preferences);

      for(let i=0; i<this.preferences.length; i++){
        if(this.editProfile.preferences[i]){
          this.editProfile.preferences[i]=this.preferences[i];
          console.log("EditProfile.preferences After"+this.editProfile.preferences[i].name);
        }else{
          this.editProfile.preferences.splice(i, 1);
        }
      }

      console.log(this.editProfile.preferences);


      this.profileService.updateProfile(this.editProfile).subscribe({
        next: (result) => {},
        error: (err) => {
          console.error(
            'UpdateProfileComponent.UpdateProfile(): error Updating Profile: '
          );
          console.error(err);
        },
      });
    }
  }

}
