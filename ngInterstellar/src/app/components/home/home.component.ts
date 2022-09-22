import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  newUser: User = new User();

  loginUser: User = new User();


  constructor(private userServ: UserService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loggedIn(){
    return this.auth.checkLogin();
  }

  register(user: User): void {
    console.log('Registering user:');
    this.userServ.register(user).subscribe({
      next: (registeredUser) => {
        this.loginUser = registeredUser;
        this.auth.login(user.username, user.password).subscribe({
          next: (loggedInUser: any) => {
            console.log('success');
            console.log(loggedInUser);


            this.router.navigateByUrl('/home');
          },
          error: (problem: any) => {
            console.error('RegisterComponent.register(): Error logging in user:');
            console.error(problem);
          }
        });
      },
      error: (fail) => {
        console.error('RegisterComponent.register(): Error registering account');
        console.error(fail);
      }
    });
  }




  login(user: User) {
    this.auth.login(user.username, user.password).subscribe({
      next: (loggedInUser: any) => {
        console.log(loggedInUser);
        this.router.navigateByUrl('home');
      },
      error: (problem: any) => {
        console.error('LoginComponent.login(): Error logging in user:');
        console.error(problem);
      },
    });
  }

  logout(){
    console.log("logout");
    this.auth.logout();
    this.router.navigateByUrl('home');

    }

}
