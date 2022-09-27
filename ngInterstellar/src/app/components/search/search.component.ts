import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StarService } from 'src/app/services/star.service';
import { UserService } from 'src/app/services/user.service';

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
  ageMax = 65;
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
        console.log(user);

        this.loggedInUser = user;
        this.profileService.findByUserId(this.loggedInUser.id).subscribe({
          next: (profile) => {
            this.loginProfile = profile;
            this.findAllProfiles();
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
  findAllProfiles() {
    this.profileService.findAll().subscribe({
      next: (profiles) => {
        this.profiles = profiles;
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
    if (this.counter % 2 != 0) {
      this.displayProfiles = [];
      this.profiles.forEach((each) => {
        if (each.categories.length === 0) {
          if (
            each.sex === this.selectedType ||
            (this.selectedType === '' &&
              (each.address.state === this.selectedState ||
                this.selectedCat === '') &&
              each.age > this.ageMin &&
              each.age < this.ageMax)
          ) {
            if (!this.displayProfiles.includes(each)) {
              this.displayProfiles.push(each);
            }
          }
        }
        each.categories.forEach((cat) => {
          if (
            each.sex === this.selectedType ||
            (this.selectedType === '' &&
              (cat.name === this.selectedCat || this.selectedCat === '') &&
              (each.address.state === this.selectedState ||
                this.selectedCat === '') &&
              each.age > this.ageMin &&
              each.age < this.ageMax)
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
      this.ageMax = 65;
      console.log(this.displayProfiles.length);
      this.counter++;
    } else {
      this.displayProfiles = [];
      this.profiles.forEach((each) => {
        if (each.categories.length === 0) {
          if (
            each.sex === this.selectedType ||
            (this.selectedType === '' &&
              (each.address.state === this.selectedState ||
                this.selectedCat === '') &&
              each.age > this.ageMin &&
              each.age < this.ageMax)
          ) {
            if (!this.displayProfiles.includes(each)) {
              this.displayProfiles.push(each);
            }
          }
        }
        each.categories.forEach((cat) => {
          if (
            each.sex === this.selectedType ||
            (this.selectedType === '' &&
              (cat.name === this.selectedCat || this.selectedCat === '') &&
              (each.address.state === this.selectedState ||
                this.selectedCat === '') &&
              each.age > this.ageMin &&
              each.age < this.ageMax)
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
      this.ageMax = 65;
      this.counter++;
    }
  }
}
