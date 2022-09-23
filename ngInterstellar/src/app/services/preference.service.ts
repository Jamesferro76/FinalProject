import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preference } from '../models/preference';
import { Profile } from '../models/profile';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private bUrl=environment.baseUrl;
  private url = environment.baseUrl + 'api/preferences'; // change 'todos' to your API path
    constructor(private http: HttpClient, private auth: AuthService) { }

    getHttpOptions() {
      let options = {
        headers: {
          Authorization: 'Basic ' + this.auth.getCredentials(),
          'X-Requested-With': 'XMLHttpRequest',
        },
      };
      return options;
    }

    findAll(){
      return this.http.get<Preference[]>(this.url, this.getHttpOptions()).pipe(
        catchError((err: any)=>{
          console.log(err);
          return throwError(
            ()=>new Error(
              'PreferenceService.index():error retrieving Preference List: '+ err
            )
          );
        })
      );
    }

    findByName(name: string){
      return this.http.get<Preference>(this.url+"/"+name, this.getHttpOptions()).pipe(
        catchError((err: any)=>{
          console.log(err);
          return throwError(
            ()=>new Error(
              'PreferenceService.findByName:error retrieving Preference List: '+ err
            )
          );
        })
      );
    }
}
