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

  editProfile: Profile | null = null;

  loggedInUser: User | null = null;

  editAddress: boolean = false;
  newAddress: Address = new Address();

  constructor(
    private mixerService: MixerService,
    private profileService: ProfileService,
    private authService: AuthService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
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
        },
        error: (err) => {
          console.error(
            'UpdateProfileComponent.UpdateProfile(): error Updating Profile: '
          );
          console.error(err);
        },
      });
    }
    this.reload;
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

  getBadgeColor(): string {
    let count = this.getNumberOfMixers();
    if (count > 10) {
      return 'bg-danger';
    } else if (count > 5) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  reload(): void {
    this.mixerService.index().subscribe({
      next: (mixers) => {
        this.mixers = mixers;
      },
      error: (problem) => {
        console.error('MixerHttpComponent.reload(): error loading mixer:');
        console.error(problem);
      },
    });
  }
}
