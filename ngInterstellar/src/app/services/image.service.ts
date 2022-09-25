import { HttpClient } from '@angular/common/http';
import { Image } from './../models/image';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private bUrl=environment.baseUrl;
  private url = environment.baseUrl + 'api/images'; // change 'todos' to your API path
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

    create(newImage: Image){

      return this.http.post<Image>(this.url, newImage, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.create(): error creating Profile: ' + err )
          );
        })
      );
    }

    delete(newImage: Image){

      return this.http.delete<boolean>(this.url+"/"+ newImage.id, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'ProfileService.create(): error creating Profile: ' + err )
          );
        })
      );
    }
}
