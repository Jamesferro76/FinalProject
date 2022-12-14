import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StarService } from 'src/app/services/star.service';
import { UserService } from 'src/app/services/user.service';
import { Star } from 'src/app/models/star';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  loggedInUser: User | null = null;
  loginProfile: Profile | null = null;
  displayProfiles: Profile[] = [];
  profiles: Profile[] = [];
  selectedType = '';
  selectedCat = '';
  selectedState = '';
  counter = 1;
  types = [
    'Male',
    'Female',
    'Non-Binary',
    'Trans Man',
    'Trans Woman',
    'Gender-Fluid',
    'None',
  ];
  categories = [
    'Active',
    'Athletic',
    'Clean',
    'Flexible',
    'Dedicated',
    'Humorous',
    'Ambitious',
    'Unpredictable',
    'Quiet',
    'Sarcastic',
  ];
  stateAbr = [
    'AK',
    'AL',
    'AR',
    'AS',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DC',
    'DE',
    'FL',
    'GA',
    'GU',
    'HI',
    'IA',
    'ID',
    'IL',
    'IN',
    'KS',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MN',
    'MO',
    'MP',
    'MS',
    'MT',
    'NC',
    'ND',
    'NE',
    'NH',
    'NJ',
    'NM',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UM',
    'UT',
    'VA',
    'VI',
    'VT',
    'WA',
    'WI',
    'WV',
    'WY',
  ];
  ages = [
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
    56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
    75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93,
    94, 95, 96, 97, 98, 99, 100,
  ];
  ageMin = 18;
  ageMax = 100;

  outOfMatches: boolean = false;

  selected: Profile | null = null;
  lastSelected: Profile | null = null;

  defaultImageUrl: string = 'https://s3.envato.com/files/158241052/1.jpg';

  profileIndex: number = 0;

  star: Star = new Star();

  loginUser: User = new User();

  starName: string = 'StarName';

  constructor(
    private userServ: UserService,
    private starService: StarService,
    private profileService: ProfileService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
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
    this.findAllProfiles();
  }

  loggedIn() {
    return this.auth.checkLogin();
  }
  findAllProfiles() {
    this.profileService.findAll().subscribe({
      next: (profiles) => {
        this.profiles = profiles;
        this.displayProfiles = this.profiles;
        this.selectRandomProfile();
      },
      error: (problem: any) => {
        console.error(
          'HomeComponent.findAllProfiles(): Error FindAllProfiles failed:'
        );
        console.error(problem);
      },
    });
  }
  getNumberOfProfiles() {
    return this.profiles.length;
  }

  displayList() {
    this.closePopupSearch();
    if (this.counter % 2 != 0) {
      this.displayProfiles = [];
      this.profiles.forEach((each) => {
        if (each.categories.length === 0) {
          if (
            (each.sex === this.selectedType || this.selectedType === '') &&
            (each.address.state === this.selectedState ||
              this.selectedState === '') &&
            each.age > this.ageMin &&
            each.age < this.ageMax
          ) {
            if (!this.displayProfiles.includes(each)) {
              this.displayProfiles.push(each);
            }
          }
        }
        each.categories.forEach((cat) => {
          if (
            (each.sex === this.selectedType || this.selectedType === '') &&
            (cat.name === this.selectedCat || this.selectedCat === '') &&
            (each.address.state === this.selectedState ||
              this.selectedState === '') &&
            each.age > this.ageMin &&
            each.age < this.ageMax
          ) {
            if (!this.displayProfiles.includes(each)) {
              this.displayProfiles.push(each);
            }
          }
        });
      });

      this.selectedType = '';
      this.selectedCat = '';
      this.selectedState = '';
      this.ageMin = 18;
      this.ageMax = 100;
      console.log(this.displayProfiles.length);
      this.counter++;
    } else {
      this.displayProfiles = [];
      this.profiles.forEach((each) => {
        if (each.categories.length === 0) {
          if (
            (each.sex === this.selectedType || this.selectedType === '') &&
            (each.address.state === this.selectedState ||
              this.selectedState === '') &&
            each.age > this.ageMin &&
            each.age < this.ageMax
          ) {
            if (!this.displayProfiles.includes(each)) {
              this.displayProfiles.push(each);
            }
          }
        }
        each.categories.forEach((cat) => {
          if (
            (each.sex === this.selectedType || this.selectedType === '') &&
            (cat.name === this.selectedCat || this.selectedCat === '') &&
            (each.address.state === this.selectedState ||
              this.selectedState === '') &&
            each.age > this.ageMin &&
            each.age < this.ageMax
          ) {
            if (!this.displayProfiles.includes(each)) {
              this.displayProfiles.push(each);
            }
          }
        });
      });
      this.selectedType = '';
      this.selectedCat = '';
      this.selectedState = '';
      this.ageMin = 18;
      this.ageMax = 100;
      this.counter++;
    }
    this.selectRandomProfile();
  }
  counterForPic: number = 0;
  selectPicForward(images: Image[]) {
    this.counterForPic++;
    if (this.counterForPic >= images.length) {
      this.counterForPic = 0;
    }
  }
  selectPicBackward(images: Image[]) {
    this.counterForPic--;
    if (this.counterForPic < 0) {
      this.counterForPic = images.length - 1;
    }
  }

  selectRandomProfile() {
    if (this.displayProfiles.length > 0) {
      this.profileIndex = Math.floor(
        Math.random() * this.displayProfiles.length
      );
      this.selected = this.displayProfiles[this.profileIndex];
      if (!this.selected.profilePic) {
        this.selected.profilePic = this.defaultImageUrl;
      }
      if (this.selected.images.length < 1) {
        this.selected.images.push(new Image(0, this.selected.profilePic));
      }
    } else {
      this.outOfMatches = true;
    }
  }

  likedAProfile() {
    console.log('Inside LikeAProfile');
    this.counterForPic = 0;
    if (this.loginProfile && this.selected) {
      this.lastSelected = this.selected;
      if (!this.loginProfile.favorited) {
        this.loginProfile.favorited = [];
      }
      this.loginProfile = this.updateProfile(this.lastSelected.id);

      this.checkForMatch();
      this.displayProfiles.splice(this.profileIndex, 1);

      if (this.displayProfiles.length < 1) {
        this.findAllProfiles();
      } else {
        this.selectRandomProfile();
      }
    } else {
      console.log('this.loginProfile' + this.loginProfile);
      console.log('this.selected' + this.selected);
    }
  }

  nextAProfile() {
    this.displayProfiles.splice(this.profileIndex, 1);
    if (this.displayProfiles.length < 1) {
      this.findAllProfiles();
    } else {
      this.selectRandomProfile();
    }
  }

  checkForMatch() {
    console.log('You made it to checkForMatch.');

    if (this.loginProfile && this.lastSelected) {
      this.profileService.checkFavorited(this.lastSelected.id).subscribe({
        next: (result) => {
          console.log('In checkFavorited' + result);
          if (this.loginProfile && this.lastSelected && result) {
            this.star.matcher = this.loginProfile;
            this.star.matched = this.lastSelected;
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

  createStar() {
    console.log('In create a star');

    this.starService.create(this.star).subscribe({
      next: (result) => {
        //Make a message pop up that you have a match
        console.log(result);
        if (this.lastSelected) {
          this.starName = this.lastSelected.firstName;
        }
        this.openPopup();
      },
      error: (err) => {
        console.error('Error creating match');
        console.error(err);
      },
    });
  }

  getLogginProfile() {
    console.log('In getLogginProfile');
    console.log('this.loginUser' + this.loginUser.id);

    this.profileService.findByUserId(this.loginUser.id).subscribe({
      next: (profile) => {
        this.loginProfile = profile;
        console.log('this.loginProfile' + this.loginProfile);
        console.log('Results: ' + profile);
      },
      error: (err) => {
        console.error('Error retrieving Profile');
        console.error(err);
      },
    });
  }

  updateProfile(likedProfileId: number) {
    console.log('In updateProfile likedProfileId' + likedProfileId);

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

  // Modals
  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }

  displayStyleSearch = 'none';

  openPopupSearch() {
    this.displayStyleSearch = 'block';
  }
  closePopupSearch() {
    this.displayStyleSearch = 'none';
  }

  toProfilePage() {
    if (this.lastSelected) {
      this.router.navigateByUrl('profile/' + this.lastSelected.id);
    }
  }

  toChat() {
    this.router.navigateByUrl('ichat');
  }
}
