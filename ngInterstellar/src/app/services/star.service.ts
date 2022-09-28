import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { Star } from '../models/star';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  private bUrl=environment.baseUrl;
  private url = environment.baseUrl + 'api/stars'; // change 'todos' to your API path
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

    create(newStar: Star){

      return this.http.post<Star>(this.url, newStar, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'StarService.create(): error creating Star: ' + err )
          );
        })
      );
    }

    findByUser(){
      return this.http.get<Profile[]>(this.url, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.create(): error creating Profile: ' + err )
          );
        })
      );
    }

    findSpecificStar(id:number){
      return this.http.get<Star>(this.url+"/"+id, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.create(): error creating Profile: ' + err )
          );
        })
      );
    }

    update(id:number, reason:string){
      return this.http.put<Star>(this.url+"/block/"+id, reason, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.create(): error creating Profile: ' + err )
          );
        })
      );
    }

}
