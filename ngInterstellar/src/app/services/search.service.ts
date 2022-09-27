import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private bUrl = environment.baseUrl;
  private url = environment.baseUrl + 'api/profiles'; // change 'todos' to your API path
  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }
  findAll() {
    return this.http.get<Profile[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'ProfileService.index():error retrieving Profile List: ' + err
            )
        );
      })
    );
  }
}
