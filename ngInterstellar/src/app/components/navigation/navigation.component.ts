import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  mobile: boolean = false;

  ngOnInit(): void {}

  loggedIn() {
    return this.auth.checkLogin();
  }

  logout() {
    console.log('logout');
    this.auth.logout();
    this.router.navigateByUrl('home');
  }
}
