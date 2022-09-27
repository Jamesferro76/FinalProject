import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/image';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  loginProfile: Profile|null=null;

  loggedInUser: User = new User ();

  selected: Profile|null=null;

  constructor(private profileService: ProfileService,
    private imageService: ImageService,
    private addressService: AddressService,
    private preferenceService: PreferenceService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let idStr=this.route.snapshot.paramMap.get('id');

    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);

        this.loggedInUser = user;
        this.profileService.findByUserId(this.loggedInUser.id).subscribe({
          next: (profile) => {
            this.loginProfile = profile;
            this.findProfileToView(idStr);
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

  findProfileToView(idStr:string|null){
    if(idStr){
      let profileId=Number.parseInt(idStr);
      if(! isNaN(profileId)){
        this.profileService.findById(profileId).subscribe({
          next:(profile)=>{
            this.selected=profile;
          },
          error: (err)=>{
            console.error('Error retrieving Profile');
            console.error(err);
            this.router.navigateByUrl('NotFound');
          }
        })

      }else{
        console.error('Invalid Profile Id: '+idStr)
        this.router.navigateByUrl('NotFound');
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

}
