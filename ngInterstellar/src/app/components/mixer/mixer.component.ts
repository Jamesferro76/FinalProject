import { DuplicatesPipe } from './../../pipes/duplicates.pipe';
import { ProfileComponent } from './../profile/profile.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mixer } from 'src/app/models/mixer';
import { Profile } from 'src/app/models/profile';
import { MixerService } from 'src/app/services/mixer.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { Preference } from 'src/app/models/preference';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.css'],
})
export class MixerComponent implements OnInit {
  title = 'Mixer Page';

  selected: Mixer | null = null;

  newMixer = new Mixer();

  editMixer: Mixer | null = null;

  mixers: Mixer[] = [];

  displayMixers: Mixer[] = [];

  editProfile: Profile | null = null;

  loggedInUser: User | null = null;

  editAddress: boolean = false;
  newAddress: Address = new Address();

  showDetails: boolean = true;

  showHost: boolean = false;

  selectedState = '';

  selectedCity = '';

  stateAbr2: string[] = [];
  cityList: string[] = [];

  initialCreate: boolean = true;

  displayAll: boolean = true;

  displaySearch: boolean = true;

  constructor(
    private mixerService: MixerService,
    private profileService: ProfileService,
    private authService: AuthService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,
    private duplicates: DuplicatesPipe
  ) {}

  ngOnInit(): void {
    let idStr = this.route.snapshot.paramMap.get('id');
    if (idStr) {
      let mixerId = Number.parseInt(idStr);
      if (!isNaN(mixerId)) {
        this.mixerService.show(mixerId).subscribe({
          next: (mixer: Mixer | null) => {
            this.selected = mixer;
          },
          error: (err: any) => {
            console.error('Error retrieving mixer');
            console.error(err);
            this.router.navigateByUrl('noSuchMixer');
          },
        });
      } else {
        console.error('Invalid id');
        this.router.navigateByUrl('invalidId');
      }
    }

    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);

        this.loggedInUser = user;
        this.profileService.findByUserId(this.loggedInUser.id).subscribe({
          next: (profile) => {
            this.editProfile = profile;
            console.log(this.editProfile);
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
    this.reload();
  }
  addMixer() {
    this.mixerService.create(this.newMixer).subscribe({
      next: (result) => {
        this.newMixer = new Mixer();
        this.reload();
      },
      error: (prob) => {
        console.error('MixerHttpComponent.addMixer(): error creating mixer:');
        console.error(prob);
      },
    });
    this.toggleAdd();
  }

  setEditMixer() {
    this.editMixer = Object.assign({}, this.selected);
  }

  updateMixer(updatedMixer: Mixer) {
    this.mixerService.updateMixer(updatedMixer).subscribe({
      next: (result) => {
        this.selected = result;
        this.editMixer = null;
        this.reload();
      },
      error: (prob) => {
        console.error(
          'MixerHttpComponent.updateMixer(): error updating mixer:'
        );
        console.error(prob);
      },
    });
  }

  joinMixer(joinMixer: Mixer) {
    if (this.editProfile != null) {
      this.editProfile.mixersAttending.push(joinMixer);
      this.profileService.updateProfile(this.editProfile).subscribe({
        next: (result) => {
          this.selected = null;
          this.reload();
        },
        error: (err) => {
          console.error(
            'UpdateProfileComponent.UpdateProfile(): error Updating Profile: '
          );
          console.error(err);
        },
      });
    }
  }

  updateCompleted(updatedMixer: Mixer) {
    this.mixerService.updateMixer(updatedMixer).subscribe({
      next: (result) => {
        this.reload();
      },
      error: (prob) => {
        console.error(
          'MixerHttpComponent.updateCompleted(): error updating mixer:'
        );
        console.error(prob);
      },
    });
  }

  deleteMixer(id: number) {
    this.mixerService.delete(id).subscribe({
      next: () => {
        this.reload();
      },
      error: (prob) => {
        console.error(
          'MixerHttpComponent.deleteMixer(): error deleting mxier:'
        );
        console.error(prob);
      },
    });
  }

  getNumberOfMixers() {
    return this.mixers.length;
  }

  displayMixer(mixer: Mixer) {
    console.log(mixer);
  }

  displayTable() {
    this.selected = null;
  }

  reload(): void {
    this.mixerService.index().subscribe({
      next: (mixers) => {
        this.mixers = mixers;
        mixers.forEach((each) => {
          if (!this.stateAbr2.includes(each.address.state)) {
            this.stateAbr2.push(each.address.state);
          }
          if (!this.cityList.includes(each.address.city)) {
            this.cityList.push(each.address.city);
          }
        });
        this.getMixerList();
      },
      error: (problem) => {
        console.error('MixerHttpComponent.reload(): error loading mixer:');
        console.error(problem);
      },
    });
    console.log(this.displayMixers);
  }

  detailsLinkToggle() {
    this.showDetails = true;
    this.showHost = false;
  }

  hostLinkToggle() {
    this.showDetails = false;
    this.showHost = true;
  }
  getMixerList() {
    this.closePopupSearch();
    console.log(this.selectedState);
    this.displayMixers = [];
    this.mixers.forEach((each) => {
      if (
        (each.address.state === this.selectedState ||
          this.selectedState === '') &&
        (each.address.city === this.selectedCity || this.selectedCity === '')
      ) {
        if (!this.displayMixers.includes(each)) {
          this.displayMixers.push(each);
        }
      }
    });
    this.selectedState = '';
    this.selectedCity = '';
  }

  toggleAdd() {
    this.initialCreate = !this.initialCreate;
    this.displayAll = !this.displayAll;
    this.displaySearch = !this.displaySearch;
  }

  toggleSearch() {
    this.displaySearch = !this.displaySearch;
    this.displayAll = !this.displayAll;
  }

displayStyleSearch = "none";

openPopupSearch() {
  this.displayStyleSearch = "block";
}
closePopupSearch() {
  this.displayStyleSearch = "none";
}

}
