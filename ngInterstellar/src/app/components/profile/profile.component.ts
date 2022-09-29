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
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loggedInUser: User | null = null;
  selected: Profile | null = null;

  displayAllInfo: boolean = false;
  displayUpdate: boolean = false;
  displayProfile: boolean = false;

  showMixers: boolean = false;
  showInterests: boolean= false;
  showPhotos: boolean= true;


  editButtons: boolean=false;

  editProfile: Profile | null = null;
  newProfile: Profile = new Profile();

  addImage: boolean = false;
  newImage: Image = new Image();
  editAddress: boolean = false;
  newAddress: Address = new Address();

  preferences: Preference[] = [];
  preferences1: Preference[] = [];

  preference: Preference = new Preference();

  categories: Category[] = [];
  categories1: Category[] = [];

  category: Category = new Category();

  basicEdit: boolean = false;
  sexualityEdit: boolean = false;
  locationEdit: boolean = false;
  picsEdit: boolean = false;
  initialCreate: boolean=false;
  amountOfImages: number=0;

  defaultImageUrl: string="https://s3.envato.com/files/158241052/1.jpg";

  selectedPrefs = [false, false, false, false, false];

  stateAbr=["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

  constructor(
    private profileService: ProfileService,
    private imageService: ImageService,
    private addressService: AddressService,
    private preferenceService: PreferenceService,
    private categoryService: CategoryService,
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
            this.loadPreferences();
            this.loadCategories();
            // if(!profile.profilePic){
            //   profile.profilePic=this.defaultImageUrl;
            // }
            // if(profile.images.length<1){
            //     profile.images.push(new Image(0, profile.profilePic));
            // }

            this.selected = profile;
            try{
            if(this.selected.images.length<1){
              this.selected.images.push(new Image(0, this.selected.profilePic));
          }
        }catch{}
            this.editProfile= this.selected;
            this.displayProfilePage();

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

  loadCategories() {
    this.categoryService.findAll().subscribe({
      next: (result) => {
        //console.log(result);

        this.categories = result;
        console.log(this.categories);
      },
      error: (err) => {
        console.error('Error retrieving Preferences');
        console.error(err);
      },
    });
  }

  setEditProfile() {
    this.editProfile = Object.assign({}, this.selected);
    if(this.selected){
    console.log("EditProfileCategories"+this.editProfile.categories);
    console.log(this.selected.categories);
    console.log("EditProfilePreferences"+this.editProfile.preferences);
    console.log(this.selected.preferences);
    }
    //   for(let i=0; i<this.editProfile.preferences.length; i++){
    //     let index=this.prefs.indexOf(this.editProfile.preferences[i].name);
    //     this.selectedPrefs[index]=true;
    //   }
    //   console.log(this.selectedPrefs);
  }

  cancelEdit() {
    this.editProfile = null;
  }

  prepProfile() {
    this.addAddressToProfile();
  }

  addProfile() {
    this.profileService.createProfile(this.newProfile).subscribe({
      next: (data) => {
        this.newProfile = new Profile();
        this.selected = data;
        this.editProfile = data;
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
    if (this.editProfile&&this.editProfile.images.length<5) {
      this.imageService.create(this.newImage).subscribe({
        next: (result) => {
          if (this.editProfile) {
            this.editProfile.images.push(result);
            this.newImage = new Image();
            this.addImage = false;
            this.amountOfImages=this.editProfile.images.length;
            this.updateProfile(this.editProfile);
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
        if(this.editProfile){
        this.editProfile.address = result;
        console.log(this.editProfile.address);
        console.log('Results: ' + result);

        this.newAddress = new Address();
        this.perf();
        }
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
      newAddress.id = this.selected.address.id;
      console.log(newAddress);
      this.addressService.update(newAddress).subscribe({
        next: (result) => {
          if (this.selected) {
            this.selected.address = result;
            this.newAddress = new Address();
            this.editAddress = false;
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

  perf() {
    if (this.editProfile != null) {
      this.preferences1;
      for (let i = 0; i < this.preferences.length; i++) {
        if (this.editProfile.preferences[i]) {
          if (this.preferences1.includes(this.preferences[i])) {
          } else {
            this.preferences1.push(this.preferences[i]);
          }
        } else if (!this.editProfile.preferences[i]) {
          if (this.preferences1.includes(this.preferences[i])) {
          } else {
            this.preferences1.splice(i, 1);
          }
        }
      }
      this.editProfile.preferences = [];
      this.editProfile.preferences = this.preferences1;

        this.categories1;
        for (let i = 0; i < this.categories.length; i++) {
          if (this.editProfile.categories[i]) {
            if (this.categories1.includes(this.categories[i])) {
            } else {
              this.categories1.push(this.categories[i]);
            }
          } else if (!this.editProfile.categories[i]) {
            if (this.categories1.includes(this.categories[i])) {
            } else {
              this.categories1.splice(i, 1);
            }
          }
        }
        this.editProfile.categories = [];
        this.editProfile.categories = this.categories1;


      this.profileService.updateProfile(this.editProfile).subscribe({
        next: (result) => {
          if (this.editProfile != null) this.editProfile.preferences = [];
          if (this.editProfile != null) this.editProfile.categories = [];
          this.selected = result;
          this.editProfile=this.selected;

        },
        error: (err) => {
          console.error(
            'UpdateProfileComponent.UpdateProfile(): error Updating Profile: '
          );
          console.error(err);
        },
      });
    }
    this.preferences1 = [];
    this.categories1 = [];
  }

  createProfile(){
    this.basicEdit=true;
    this.sexualityEdit=true;
    this.locationEdit=true;
    this.picsEdit=true;
    this.initialCreate=true;
  }

  basicEditCreate(){
    this.basicEdit=false;
    this.editProfile=this.newProfile;
    this.addProfile();
  }

  basicEditSave(){
    this.basicEdit=false;
    this.perf();
  }

  displayBasicEdit(){
    this.basicEdit=!this.basicEdit;
    this.sexualityEdit=false;
    this.locationEdit=false;
    this.picsEdit=false;
  }

  sexualityEditSave(){
    this.sexualityEdit=false;
    this.perf();
  }
  displaySexualityEdit(){
    this.sexualityEdit=!this.sexualityEdit;
    this.basicEdit=false;
    this.locationEdit=false;
    this.picsEdit=false;
  }

  locationEditSave(newAddress:Address){
    this.locationEdit=false;
    if(this.selected){
      if(this.selected.address){
        this.updateAddress(newAddress);
      }else{
      this.addAddressToProfile();
    }
  }
  }

  displayLocationEdit(){
    this.locationEdit=!this.locationEdit;
    this.sexualityEdit=false;
    this.basicEdit=false;
    this.picsEdit=false;
  }

  picsEditSave(){
    this.picsEdit=false;
    this.initialCreate=false;
    this.perf();
  }
  displayPicsEdit(){
    this.picsEdit=!this.picsEdit;
    this.sexualityEdit=false;
    this.locationEdit=false;
    this.basicEdit=false;
    if(this.editProfile){
      this.amountOfImages=this.editProfile.images.length
    }
  }
  picToDelete:Image|null=null;
  deletePic(i: number){
    console.log(i);

    if(this.editProfile){
      this.picToDelete=this.editProfile.images[i];
    this.editProfile.images.splice(i, 1);
    if(this.picToDelete){
    this.imageService.delete(this.picToDelete).subscribe({
      next: (result) => {
        if(this.editProfile){
          this.picToDelete=null;
          this.perf();
        }
      },
      error: (err) => {
        console.error(
          'ProfileComponent.deletePic(): error Pic not deleted: '
        );
        console.error(err);
      },
    });
  }
  }
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

  displayAllInfoPage(){
    this.displayAllInfo=true;
    this.displayUpdate=false;
    this.displayProfile=false;
  }
  displayUpdatePage(){
    this.displayAllInfo=false;
    this.displayUpdate=true;
    this.displayProfile=false;
  }
  displayProfilePage(){
    this.displayAllInfo=false;
    this.displayUpdate=false;
    this.displayProfile=true;
  }

  editButtonsToggle(){
    this.editButtons=!this.editButtons;
  }

  photoLinkToggle(){
    this.showPhotos = true;
    this.showMixers = false;
    this.showInterests = false;
  }

  mixerLinkToggle(){
    this.showPhotos = false;
    this.showMixers = true;
    this.showInterests = false;
  }

  interestLinkToggle(){
    this.showPhotos = false;
    this.showMixers = false;
    this.showInterests = true;
  }



}

