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
    constructor(private http: HttpClient) { }

    findAll(){
      return this.http.get<Profile[]>(this.url).pipe(
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
      return this.http.get<Profile[]>(this.url+"/"+id).pipe(
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

    createProfile(newProfile: Profile){
      newProfile.active=true;
      console.log(newProfile.firstName);
      return this.http.post<Profile>(this.url, newProfile).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.create(): error creating Profile: ' + err )
          );
        })
      );
    }

    updateProfile(updateProfile: Profile){

      return this.http.put<Profile>(this.url+"/"+updateProfile.id, updateProfile).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.update(): error updating Profile: ' + err )
          );
        })
      );

    }

    destroy(id: number){

      return this.http.delete<Profile>(this.url+"/"+id).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.delete(): error deleting Profile: ' + err )
          );
        })
      );
    }

}
