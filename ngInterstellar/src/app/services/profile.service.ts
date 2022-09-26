import { AuthService } from './auth.service';
import { Profile } from './../models/profile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private bUrl=environment.baseUrl;
  private url = environment.baseUrl + 'api/profiles'; // change 'todos' to your API path
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
      return this.http.get<Profile[]>(this.url, this.getHttpOptions()).pipe(
        catchError((err: any)=>{
          console.log(err);
          return throwError(
            ()=>new Error(
              'ProfileService.index():error retrieving Profile List: '+ err
            )
          );
        })
      );
    }

    findById(id: number){
      return this.http.get<Profile>(this.url+"/"+id, this.getHttpOptions()).pipe(
        catchError((err: any)=>{
          console.log(err);
          return throwError(
            ()=>new Error(
              'ProfileService.index():error retrieving Profile List: '+ err
            )
          );
        })
      );
    }

    findByUserId(id: number){
      return this.http.get<Profile>(this.url+"/user/"+id, this.getHttpOptions()).pipe(
        catchError((err: any)=>{
          console.log(err);
          return throwError(
            ()=>new Error(
              'ProfileService.findByUser():error retrieving Profile: '+ err
            )
          );
        })
      );
    }

    createProfile(newProfile: Profile){
      newProfile.active=true;
      console.log(newProfile.firstName);
      return this.http.post<Profile>(this.url, newProfile, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.create(): error creating Profile: ' + err )
          );
        })
      );
    }

    updateProfile(updateProfile: Profile){

      return this.http.put<Profile>(this.url+"/"+updateProfile.id, updateProfile, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.update(): error updating Profile: ' + err )
          );
        })
      );

    }

    destroy(id: number){

      return this.http.delete<Profile>(this.url+"/"+id, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.delete(): error deleting Profile: ' + err )
          );
        })
      );
    }

    addFavorited(likedProfileId: number){
      return this.http.get<Profile>(this.url+"/favorite/"+likedProfileId, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.addFavorited(): error adding favorited: ' + err )
          );
        })
      );
    }

    checkFavorited(likedProfileId: number){
      return this.http.get<Profile>(this.url+"/favorite/check/"+likedProfileId, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.checkFavorited(): error adding favorited: ' + err )
          );
        })
      );

    }

}
