import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private bUrl=environment.baseUrl;
  private url = environment.baseUrl + 'api/addresses'; // change 'todos' to your API path
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
      return this.http.get<Address[]>(this.url, this.getHttpOptions()).pipe(
        catchError((err: any)=>{
          console.log(err);
          return throwError(
            ()=>new Error(
              'AddressService.findAll():error retrieving Address list: '+ err
            )
          );
        })
      );
    }

    findById(id: number){
      return this.http.get<Address>(this.url+"/"+id, this.getHttpOptions()).pipe(
        catchError((err: any)=>{
          console.log(err);
          return throwError(
            ()=>new Error(
              'AddressService.findById():error retrieving Address: '+ err
            )
          );
        })
      );
    }

    findByProfile(id: number){
      return this.http.get<Address>(this.url+"/profile", this.getHttpOptions()).pipe(
        catchError((err: any)=>{
          console.log(err);
          return throwError(
            ()=>new Error(
              'AddressService.findByProfile():error retrieving Address: '+ err
            )
          );
        })
      );
    }

    create(newAddress: Address){
      return this.http.post<Address>(this.url, newAddress, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'AddressService.create(): error creating Address: ' + err )
          );
        })
      );
    }

    update(updateAddress: Address){

      return this.http.put<Address>(this.url, updateAddress, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'AddressService.update(): error updating Address: ' + err )
          );
        })
      );

    }
}
