import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8090/';
  private url = environment.baseUrl + 'api/users';

  constructor(private http: HttpClient, private auth: AuthService) {}

  register(user: User): Observable<User> {
    // Create POST request to register a new account
    return this.http.post<User>(this.baseUrl + 'register', user).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('AuthService.register(): error registering user.')
        );
      })
    );
  }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('UserService.index(): error retrieving user' + err)
        );
      })
    );
  }

  show(userId: any): Observable<User> {
    return this.http
      .get<User>(this.url + '/' + userId, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('UserService.index(): error retrieving user' + err)
          );
        })
      );
  }

  create(user: User) {
    return this.http.post<User>(this.url, user, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('UserService.create(): error creating User: ' + err)
        );
      })
    );
  }

  update(user: User): Observable<User> {
    console.log(user.username);
    console.log(user.password);
    return this.http.put<User>(this.url, user, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('UserService.update(): error updating User: ' + err)
        );
      })
    );
  }

  destroy(id: number) {
    return this.http.delete<void>(this.baseUrl + '/' + id).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('UserService.delete(): error deleting User: ' + err)
        );
      })
    );
  }
}
